const VNpayService = require('../services/PaymentSevice')
const Order = require('../models/Order')
const AppError = require('../utils/AppError')


const createVNPAYUrl = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = await Order.findOne({ _id: orderId })
    if (!order) {
      return next(new AppError("Không tìm thấy đơn hàng ", 400))
    }
    const paymentUrl = await VNpayService.createVNPayPaymentUrl(order)
    res.status(200).json({
      status: 'OK',
      message: 'Lấy URL thành công',
      paymentUrl
    })
  } catch (error) {
    next(error)
  }
}

const handleVNPAYReturn = async (req, res, next) => {
  try {
    const isValid = VNpayService.verifyVNpayreturn(req.query)
    if (!isValid) {
      return next(new AppError('Chữ ký không hợp lệ', 400))
    }
    const response = req.query.vnp_ResponseCode
    if (response === '00') { // Thành công
      return res.status(200).json({
        message: 'Thanh toán thành công',
        data: req.query
      })
    }
    //Thất bại
    return res.status(400).json({
      message: 'Thanh toán thất bại',
      data: req.query
    })
  } catch (error) {
    next(error)
  }
}


module.exports = { createVNPAYUrl, handleVNPAYReturn }