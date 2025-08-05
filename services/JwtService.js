const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
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
  }, process.env.REFRESH_TOKEN, { expiresIn: '356d' })
  return refresh_token
}
//Cấp lại acccess_token mới khi access_token cũ hết hạn mà không cần đăng nhập lại
const RefreshTokenJWTService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          return resolve({
            status: "ERROR",
            message: "The authentication"
          })
        }
        const acccess_token = await generalAccessToken({
          id: user?.id,
        })
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          acccess_token
        })
      })
    } catch (error) {
      reject(e)
    }
  })
}
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  RefreshTokenJWTService
}