const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AppError = require('../utils/AppError')
dotenv.config();


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError("Unauthorized", 400))
  }
  try {
    const token = authHeader.replace('Bearer ', '').trim()
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
    req.user = decoded
    next()
  } catch (error) {
    return next(new AppError('Token không hợp lệ hoặc đã hết hạn ', 400))
  }

}

const authMiddleWare = (req, res, next) => { // Dùng chỉ admin mới có quyền truy cập vào các route này
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next()
    } else {
      return next(new AppError("Access denied", 400))
    }
  })
}
const authUserMiddleware = (req, res, next) => { // Dùng cho các route mà chỉ cần đăng nhập là có quyền truy cập
  verifyToken(req, res, () => {
    const userId = req.params.id
    if (req.user?.isAdmin || req.user?.id === userId) {
      next()
    } else {
      return next(new AppError("Access denied", 400))
    }
  })
}

module.exports = {
  authMiddleWare,
  authUserMiddleware
}