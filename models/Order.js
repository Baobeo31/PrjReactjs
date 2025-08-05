  const mongoose = require('mongoose');

  const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    orderItems: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      image: { type: String, required: true }
    }],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      fullname: { type: String, required: true },
      phone: { type: String, required: true }
    },
    paymethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false }, // Trạng thái thanh toán
    paidAt: { type: Date },// Thời gian thanh toán
    isDelivered: { type: Boolean, default: false },// Trạng thái giao hàng
    deliveredAt: { type: Date },// Thời gian giao hàng
  }, {
    timestamps: true
  })

  const Order = mongoose.model('Order', OrderSchema);
  module.exports = Order;