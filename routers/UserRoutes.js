const express = require('express')
const router = express.Router()
const UserController = require('../controllers/authController')
const { authMiddleWare, authUserMiddleware } = require('../middlewares/authMiddleware')

router.post('/sign-up', UserController.createUser)
router.post('/login', UserController.loginUser)
router.post('/sendOTP', UserController.sendOTP)
router.post('/verify', UserController.verifyOTP)
router.post('/logout', UserController.logout)
router.put('/update/:id', authUserMiddleware, UserController.updateUser)
router.delete('/delete/:id', authMiddleWare, UserController.deleteUser)
router.get('/get-all', authMiddleWare, UserController.getAllUsers)
router.get('/get-detail/:id', authUserMiddleware, UserController.getDetailUser)
// router.post('/refresh-token', UserController.refreshtoken)



module.exports = router