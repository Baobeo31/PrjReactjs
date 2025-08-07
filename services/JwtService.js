const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const AppError = require('../utils/AppError')
dotenv.config()
//tạo 1 access_token có thời gian đủ dùng cho việc xác thực tạm thời
const generalAccessToken = async (payload) => {
  const access_token = jwt.sign({
    ...payload
  }, process.env.ACCESS_TOKEN, { expiresIn: '5m' })
  return access_token
}
//Tạo 1 refresh_token có thời gian lâu lưu trong trình duyệt để cấp lại access_token mới khi hết hạn
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({
    ...payload
  }, process.env.REFRESH_TOKEN, { expiresIn: '7d' })
  return refresh_token
}
//Cấp lại acccess_token mới khi access_token cũ hết hạn mà không cần đăng nhập lại
const RefreshTokenJWTService = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN)
    const acccess_token = await generalAccessToken({ id: decode.id })
    return {
      status: "OK",
      message: "SUCCESS",
      acccess_token
    }


  } catch (error) {
    throw new AppError("Access_token đã hết hạn hoặc không hợp lệ")
  }
}
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  RefreshTokenJWTService
}