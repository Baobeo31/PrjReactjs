const express = require('express')
const router = express.Router()
const PaymentController = require('../controllers/paymentController')

router.get('/vnpay/:orderId', PaymentController.createVNPAYUrl)
router.get('/vnpay-return', PaymentController.handleVNPAYReturn)

module.exports = router