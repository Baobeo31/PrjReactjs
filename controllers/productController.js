const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
  try {
    const { name, brand, rating, description, image, countInStock, price, discountPrice } = req.body;
    console.log(req.body);

    if (!name || !brand || !rating || !description || !image || !countInStock || !price || !discountPrice) {
      return res.status(200).json({
        status: 'Error',
        message: 'Vui lòng nhập đầy đủ thông tin sản phẩm'
      });
    }
    const newProduct = await ProductService.createProduct(req.body);
    console.log(newProduct);

    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    // ✅ Parse filter nếu là JSON string
    let parsedFilter = {};
    if (typeof filter === 'string') {
      try {
        parsedFilter = JSON.parse(filter);
      } catch (e) {
        return res.status(400).json({
          message: 'Filter không hợp lệ (không parse được)',
        });
      }
    }

    const response = await ProductService.getAllProduct(
      Number(limit),
      Number(page),
      sort,
      parsedFilter
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: 'Lỗi server: ' + error.message
    });
  }
};


const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    if (!productId) {
      return resolve({
        status: 'ERROR',
        message: 'Không thấy productID '
      })
    }
    const detailProduct = await ProductService.getDetailProduct(productId)
    return res.status(200).json(detailProduct)
  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy productID'
      });
    }
    const updateProduct = await ProductService.updateProduct(productId, data);
    return res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy productID'
      });
    }
    const deleteResponse = await ProductService.deleteProduct(productId);
    return res.status(200).json(deleteResponse);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getDetailProduct,
  updateProduct,
  deleteProduct
};