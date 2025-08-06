const Product = require('../models/Product')
const AppError = require('../utils/AppError')
const createProduct = async (newProduct) => {
  const { name, brand, rating, description, image, countInStock, price, discountPrice } = newProduct
  const checkProduct = await Product.findOne({ name })
  if (checkProduct) {
    throw new AppError("Sản phẩm này đã có ", 400)
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

  return {
    status: 'OK',
    message: 'Success',
    data: response
  }
}

const getAllProduct = async (limit, page, sort, filter) => {
  const safeLimit = Number(limit) || 10
  const safePage = Number(page) || 0

  let sortOption = {}
  if (sort) {
    const [field, order] = sort.split(':')
    if (['name', 'price'].includes(field) && ['asc', 'desc'].includes(order)) {
      sortOption[field] = order === 'asc' ? 1 : -1
    } else {
      throw new AppError("Tham số sort không hợp lệ", 400)
    }
  } else {
    sortOption = { created: -1 }
  }

  let filterOption = {}

  if (filter?.categories?.length > 0) {
    filterOption.category = { $in: filter.categories }
  }

  if (filter?.brands?.length > 0) {
    filterOption.brand = { $in: filter.brands }
  }

  if (typeof filter?.priceRange === 'string') {
    switch (filter.priceRange) {
      case 'under-1m':
        filter.priceRange = { min: 0, max: 1000000 }
        break
      case '1m-5m':
        filter.priceRange = { min: 1000000, max: 5000000 }
        break
      case '5m-10m':
        filter.priceRange = { min: 5000000, max: 10000000 }
        break
      case 'over-10m':
        filter.priceRange = { min: 10000000 }
        break
      default:
        filter.priceRange = {}
    }
  }

  if (filter?.priceRange && typeof filter.priceRange === 'object') {
    const { min, max } = filter.priceRange
    if (min !== undefined && max !== undefined) {
      filterOption.price = { $gte: min, $lte: max }
    } else if (min !== undefined) {
      filterOption.price = { $gte: min }
    } else if (max !== undefined) {
      filterOption.price = { $lte: max }
    }
  }

  const total = await Product.countDocuments(filterOption)
  const products = await Product.find(filterOption)
    .sort(sortOption)
    .skip(safePage * safeLimit)
    .limit(safeLimit)

  return {
    status: 'OK',
    message: 'Success',
    data: products,
    total,
    currentPage: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit)
  }
}

const updateProduct = async (id, data) => {
  const checkProduct = await Product.findById(id)
  if (!checkProduct) {
    throw new AppError('Sản phẩm không tồn tại', 400)
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
  return {
    status: 'OK',
    message: 'Cập nhật sản phẩm thành công',
    data: updatedProduct
  }
}

const deleteProduct = async (id) => {
  const checkProduct = await Product.findById(id)
  if (!checkProduct) {
    throw new AppError("Sản phẩm không tồn tại", 400)
  }

  const deletedProduct = await Product.findByIdAndDelete(id)
  return {
    status: 'OK',
    message: 'Xóa sản phẩm thành công',
    data: deletedProduct
  }
}

const getDetailProduct = async (id) => {
  const product = await Product.findById(id)
  if (!product) {
    throw new AppError("Không tìm thấy sản phẩm", 400)
  }

  return {
    status: 'OK',
    message: 'Lấy chi tiết sản phẩm thành công',
    data: product
  }
}

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getDetailProduct
}
