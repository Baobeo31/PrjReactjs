const Product = require('../models/Product')

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, brand, rating, description, image, countInStock, price, discountPrice } = newProduct
      const checkProduct = await Product.findOne({ name })
      if (checkProduct) {
        return resolve({
          status: 'ERROR',
          message: 'Sản phẩm này đã có'
        })
      }
      const response = await Product.create({
        name,
        brand,
        rating,
        description,
        image,
        countInStock: Number(countInStock),
        price,
        discountPrice: Number(discountPrice)
      })

      if (response) {
        return resolve({
          status: 'OK',
          message: 'Success',
          data: response
        })
      }

    } catch (error) {
      return reject(error)
    }
  })
}

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const safeLimit = Number(limit) || 10;
      const safePage = Number(page) || 0;

      let sortOption = {};
      if (sort) {
        const [field, order] = sort.split(':');
        if (['name', 'price'].includes(field) && ['asc', 'desc'].includes(order)) {
          sortOption[field] = order === 'asc' ? 1 : -1;
        } else {
          return resolve({
            status: 'ERROR',
            message: 'Tham số sort không hợp lệ'
          });
        }
      } else {
        sortOption = { created: -1 };
      }

      let filterOption = {};

      if (filter?.categories && Array.isArray(filter.categories) && filter.categories.length > 0) {
        filterOption.category = { $in: filter.categories };
      }

      if (filter?.brands && Array.isArray(filter.brands) && filter.brands.length > 0) {
        filterOption.brand = { $in: filter.brands };
      }

      // Xử lý range giá
      if (typeof filter?.priceRange === 'string') {
        switch (filter.priceRange) {
          case 'under-1m':
            filter.priceRange = { min: 0, max: 1000000 };
            break;
          case '1m-5m':
            filter.priceRange = { min: 1000000, max: 5000000 };
            break;
          case '5m-10m':
            filter.priceRange = { min: 5000000, max: 10000000 };
            break;
          case 'over-10m':
            filter.priceRange = { min: 10000000 };
            break;
          default:
            filter.priceRange = {};
        }
      }

      if (filter?.priceRange && typeof filter.priceRange === 'object') {
        const { min, max } = filter.priceRange;
        if (min !== undefined && max !== undefined) {
          filterOption.price = { $gte: min, $lte: max };
        } else if (min !== undefined) {
          filterOption.price = { $gte: min };
        } else if (max !== undefined) {
          filterOption.price = { $lte: max };
        }
      }

      const total = await Product.countDocuments(filterOption);
      console.log(filterOption);

      const products = Product.find(filterOption)
        .sort(sortOption)
        .skip(safePage * safeLimit)
        .limit(safeLimit);

      const allProduct = await products.exec();

      return resolve({
        status: 'OK',
        message: 'Success',
        data: allProduct,
        total,
        currentPage: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit)
      });
    } catch (error) {
      reject(new Error('Lỗi khi lấy danh sách sản phẩm: ' + error.message));
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id })
      if (!checkProduct) {
        return resolve({
          status: 'ERROR',
          message: 'Sản phẩm không tồn tại'
        })
      }
      const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
      return resolve({
        status: 'OK',
        message: 'Cập nhật sản phẩm thành công',
        data: updateProduct
      })
    } catch (error) {
      return reject({
        status: 'ERROR',
        message: 'Lỗi khi cập nhật sản phẩm: ' + error.message
      })
    }
  })
}

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id })
      if (!checkProduct) {
        return resolve({
          status: 'ERROR',
          message: 'Sản phẩm không tồn tại'
        })
      }
      const deleteProduct = await Product.findByIdAndDelete(id)
      return resolve({
        status: 'OK',
        message: 'Xóa sản phẩm thành công',
        data: deleteProduct
      })
    } catch (error) {
      return reject({
        status: 'ERROR',
        message: 'Lỗi khi xóa sản phẩm: ' + error.message
      })
    }
  })
}
const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id })
      if (!checkProduct) {
        return resolve({
          status: 'ERROR',
          message: 'Sản phẩm không tồn tại'
        })
      }
      return resolve({
        status: 'OK',
        message: 'Lấy chi tiết sản phẩm thành công',
        data: checkProduct
      })
    } catch (error) {
      return reject({
        status: 'ERROR',
        message: 'Lỗi khi lấy chi tiết sản phẩm: ' + error.message
      })
    }
  })
}

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct
}