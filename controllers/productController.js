const ProductService = require('../services/ProductService');
const AppError = require('../utils/AppError')
const createProduct = async (req, res, next) => {
  try {
    const { name, brand, rating, description, countInStock, price, discountPrice, category } = req.body;
    const image = req.file?.path // ảnh từ CLoudinary
    console.log('Body:', req.body);  // Log dữ liệu text
    console.log('File:', req.file);

    if (!name || !brand || !rating || !description || !image || !countInStock || !price || !discountPrice || !category) {
      return next(new AppError("Vui lòng nhập đầy đủ", 400))
    }
    const newProduct = await ProductService.createProduct({
      name,
      brand,
      rating,
      description,
      image,
      countInStock,
      price,
      discountPrice,
      category
    });

    return res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    next(error)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const { limit, page, sort, filter } = req.query;


    let parsedFilter = {};
    if (typeof filter === 'string') {
      try {
        parsedFilter = JSON.parse(filter);
      } catch (e) {
        return next(new AppError("Không parse được filter", 400))
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
    next(error)
  }
};


const getDetailProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    if (!productId) {
      return next(new AppError("Không tìm thấy Id sản phẩm", 400))
    }
    const detailProduct = await ProductService.getDetailProduct(productId)
    return res.status(200).json(detailProduct)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return next(new AppError("Không tìm thấy id Sản phẩm", 400))
    }
    const updateProduct = await ProductService.updateProduct(productId, data);
    return res.status(200).json(updateProduct);
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return next(new AppError("Không tìm thấy Id sản phẩm", 300))
    }
    const deleteResponse = await ProductService.deleteProduct(productId);
    return res.status(200).json(deleteResponse);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getDetailProduct,
  updateProduct,
  deleteProduct
};