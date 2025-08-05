const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
  try {
    const { paymethod, itemsPrice, shippingPrice, totalPrice, fullname, address, city, phone, user } = req.body;
    if (!paymethod || !itemsPrice || !shippingPrice || !totalPrice || !fullname || !address || !city || !phone || !user) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Vui lòng nhập đầy đủ thông tin đơn hàng'
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);

  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

const getAllOrderDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy ID người dùng'
      });
    }
    const response = await OrderService.getALlOrderDetail(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

const getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy ID đơn hàng'
      });
    }
    const response = await OrderService.getOrderDetail(orderId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body.orderItems;
    if (!orderId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy ID đơn hàng'
      });
    }
    const response = await OrderService.cancelOrder(orderId, data);
    return res.status(200).json(response);

  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}
const getAllOrders = async (req, res) => {
  try {
    const response = await OrderService.getAllOrders();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}
module.exports = {
  createOrder,
  getAllOrderDetail,
  getOrderDetail,
  cancelOrder,
  getAllOrders
}