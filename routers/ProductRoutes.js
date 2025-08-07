const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController')
const { authMiddleWare } = require('../middlewares/authMiddleware');
const uploadCloud = require('../utils/cloudinary')

router.post('/create', authMiddleWare, uploadCloud.single('image'), ProductController.createProduct);
router.get('/get-all', ProductController.getAllProducts);
router.get('/get-detail/:id', ProductController.getDetailProduct);
router.put('/update/:id', authMiddleWare, ProductController.updateProduct);
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct);

module.exports = router;