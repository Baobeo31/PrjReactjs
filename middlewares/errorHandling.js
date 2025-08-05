module.exports.errHandle = (error, req, res, next) => { //Nhận 4 tham số => error handler
  const statusCode = err.statusCode || res.statusCode || 500
  return res.status(statusCode).json({
    success: false,
    mes: error?.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack // 
  })
}
module.exports.notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`); // Api call by user
  res.status(404);
  next(error);
}
