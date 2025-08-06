const Order = require('../models/Order');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');

const createOrder = async (newOrder) => {
  const {
    orderItems, paymethod, itemsPrice, shippingPrice, totalPrice,
    fullname, address, city, phone, user, isPaid, paidAt
  } = newOrder;

  const updateResults = await Promise.all(orderItems.map(async (item) => {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: item.product, countInStock: { $gte: item.quantity } },
      {
        $inc: {
          countInStock: -item.quantity,
          selled: +item.quantity
        }
      },
      { new: true }
    );

    if (!updatedProduct) { //failed 
      return { error: true, id: item.product };
    }
    return { error: false };
  }));

  const failedProduct = updateResults.find(r => r.error);
  if (failedProduct) {
    throw new AppError(`Sản phẩm với ID ${failedProduct.id} không đủ số lượng tồn kho`, 400);
  }

  const createdOrder = await Order.create({
    orderItems,
    shippingAddress: { fullname, address, city, phone },
    paymethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    user,
    isPaid,
    paidAt
  });

  return {
    status: 'OK',
    message: 'Tạo đơn hàng thành công',
    data: createdOrder
  };
};

const getAllOrder = async () => {
  const orders = await Order.find();
  return {
    status: 'OK',
    message: 'Lấy danh sách đơn hàng thành công',
    data: orders
  };
};

const getAllOrderDetail = async (userId) => {
  const orders = await Order.find({ user: userId });
  if (!orders || orders.length === 0) {
    throw new AppError('Không có đơn hàng nào', 404);
  }

  return {
    status: 'OK',
    message: 'Lấy danh sách đơn hàng thành công',
    data: orders
  };
};

const getOrderDetail = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError('Không tìm thấy đơn hàng', 404);
  }

  return {
    status: 'OK',
    message: 'Lấy chi tiết đơn hàng thành công',
    data: order
  };
};

const cancelOrder = async (orderId, orderItems) => {
  const updateResults = await Promise.all(orderItems.map(async (item) => {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: item.product },
      {
        $inc: {
          countInStock: +item.quantity,
          selled: -item.quantity
        }
      },
      { new: true }
    );

    if (!updatedProduct) {
      return { error: true, id: item.product };
    }
    return { error: false };
  }));

  const failedProduct = updateResults.find(r => r.error);
  if (failedProduct) {
    throw new AppError(`Không thể cập nhật tồn kho cho sản phẩm ID ${failedProduct.id}`, 400);
  }

  const deletedOrder = await Order.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new AppError('Không tìm thấy đơn hàng để hủy', 404);
  }

  return {
    status: 'OK',
    message: 'Hủy đơn hàng thành công',
    data: deletedOrder
  };
};

module.exports = {
  createOrder,
  getAllOrder,
  getAllOrderDetail,
  getOrderDetail,
  cancelOrder
};
