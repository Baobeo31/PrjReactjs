const UserService = require('../services/UserService')
const mailer = require('nodemailer')
const AppError = require('../utils/AppError')
const passwordStrength = require('../utils/passwordStrength')
const validator = require('validator')

const createUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body
    if (!email || !password || !confirmPassword) {
      return next(new AppError("Vui lòng nhập đầy đủ thông tin", 400))
    }
    else if (!validator.isEmail(email)) {
      return next(new AppError("Email không hợp lệ", 400))
    } else if (!passwordStrength(password)) {
      return next(new AppError("Mật khẩu quá yếu. Dùng ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt", 400))
    }
    else if (password != confirmPassword) {
      return next(new AppError("Mật khẩu không giống nhau", 400))
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
const googleCallback = async (req, res) => {
  try {
    const user = req.user
    const tokens = await UserService.loginWithGoogle(user)

    return res.redirect(`${process.env.CLIENT_URL}/login/success?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`)
  } catch (error) {
    return res.redirect(`${process.env.CLIENT_URL}/login/failed`)
  }
}

const loginUser = async (req, res, next) => {

  try {
    const { email, password } = req.body
    if (!email || !password) {
      return next(new AppError("Vui lòng nhập đủ thông tin", 400))
    }
    else if (!validator.isEmail(email)) {
      return next(new AppError("Vui lòng nhập đúng email", 400))
    }

    const response = await UserService.loginUser(req.body)

    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json(newResponse)
  } catch (error) {
    next(error)
  }
}
const logout = async (req, res, next) => {
  try {
    const userId = req.user.id
    await UserService.logout(userId)

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict'
    })
    return res.status(200).json({
      status: 'OK',
      message: 'Đăng xuất thành công'
    })

  } catch (error) {
    next(error)
  }
}



const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return next(new AppError("Vui lòng nhập đầy đủ", 400))
    }
    else if (!validator.isEmail(email)) {
      return next(new AppError("Vui lòng nhập đúng kí tự", 400))
    }
    const result = await UserService.sendOTP(email)
    console.log(result);

    return res.status(200).json(result)

  } catch (error) {
    next(error)
  }
}
const verifyEmail = async (req, res, next) => {
  try {
    const { email, token } = req.query
    const result = await UserService.verifyEmail({ email, token })
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body

    if (!email || !otp || !newPassword) {
      return next(new AppError("Vui lòng nhập đầy đủ thông tin", 400))
    }
    else if (!validator.isEmail(email)) {
      return next(new AppError("Vui lòng nhập đúng kí tự", 400))
    }
    else if (!passwordStrength(newPassword)) {
      return next(new AppError("Vui lòng tạo mật khẩu gồm 8 kí tự, gồm chữ hoa, số và ký tự đặc biệt", 400))
    }
    const result = await UserService.verifyOTPandResetPass(email, otp, newPassword)
    console.log(result);

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
const getDetailUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return next(new AppError("Không tìm thấy id người dùng", 400))
    }
    const detailUser = await UserService.getDetailUser(userId)
    return res.status(200).json(detailUser)
  } catch (error) {
    next(error)
  }
}
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return next(new AppError("Không tìm thấy id người dùng", 400))
    }
    const updateUser = await UserService.updateUser(userId, data);
    return res.status(200).json(updateUser);
  } catch (error) {
    next(error)
  }
}
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return next(new AppError("Không tìm thấy id người dùng", 400))
    }
    const deleteResponse = await UserService.deleteUser(userId);
    return res.status(200).json(deleteResponse);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  loginUser,
  sendOTP,
  verifyOTP,
  logout,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailUser,
  googleCallback
}