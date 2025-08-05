const OrderService = require('../services/OrderService');
const AppError = require('../utils/AppError')
const createOrder = async (req, res, next) => {
  try {
    const { paymethod, itemsPrice, shippingPrice, totalPrice, fullname, address, city, phone, user } = req.body;
    if (!paymethod || !itemsPrice || !shippingPrice || !totalPrice || !fullname || !address || !city || !phone || !user) {
      return next(new AppError("Vui lồng nhập đầy đủ thông tin đơn", 400))
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);

  } catch (error) {
    next(error)
  }
}

const getAllOrderDetail = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return next(new AppError('Không tìm thấy Id người dùng', 400))
    }
    const response = await OrderService.getALlOrderDetail(userId);
    return res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}

const getOrderDetail = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return next(new AppError('Không tìm thấy Id đơn hàng', 400))
    }
    const response = await OrderService.getOrderDetail(orderId);
    return res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}

const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const data = req.body.orderItems;
    if (!orderId) {
      return next(new AppError('Không tìm thấy Id đơn hàng', 400))
    }
    const response = await OrderService.cancelOrder(orderId, data);
    return res.status(200).json(response);

  } catch (error) {
    next(error)
  }
}
const getAllOrders = async (req, res, next) => {
  try {
    const response = await OrderService.getAllOrders();
    return res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createOrder,
  getAllOrderDetail,
  getOrderDetail,
  cancelOrder,
  getAllOrders
}