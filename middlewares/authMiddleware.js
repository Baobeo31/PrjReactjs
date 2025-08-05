const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const authMiddleWare = (req, res, next) => { // Dùng chỉ admin mới có quyền truy cập vào các route này
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'ERROR',
      message: 'Unauthorized'
    });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'ERROR',
        message: 'Ivalid token'
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        status: 'ERROR',
        message: 'Access denied'
      });
    }
  })
}
const authUserMiddleware = (req, res, next) => { // Dùng cho các route mà chỉ cần đăng nhập là có quyền truy cập
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'ERROR',
      message: 'Unauthorized'
    });
  }
  const token = authHeader.split(' ')[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'ERROR',
        message: 'Ivalid token'
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      next()
    } else {
      return res.status(401).json({
        status: 'ERROR',
        message: 'Access denied'
      });
    }
  })
}

module.exports = {
  authMiddleWare,
  authUserMiddleware
}