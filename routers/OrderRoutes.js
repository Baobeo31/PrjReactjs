const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { authMiddleWare, authUserMiddleware } = require('../middlewares/authMiddleware');


router.post('/create/:id', authUserMiddleware, OrderController.createOrder);
router.get('/get-all', authMiddleWare, OrderController.getAllOrders);
router.get('/get-detail/:id', OrderController.getOrderDetail);
router.delete('/cancel/:id', authUserMiddleware, OrderController.cancelOrder);
router.get('/get-all-detail/:id', authUserMiddleware, OrderController.getAllOrderDetail);

module.exports = router;