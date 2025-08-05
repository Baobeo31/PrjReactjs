const UserService = require('../services/UserService')
const mailer = require('nodemailer')
const AppError = require('../utils/AppError')
const createUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email || !password || !confirmPassword) {
      return next(new AppError("Vui lòng nhập đầy đủ thông tin", 400))
    }
    else if (!isCheckEmail) {
      return next(new AppError("Vui lòng nhập đúng kí tự", 400))
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

const loginUser = async (req, res, next) => {

  try {
    const { email, password } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email || !password) {
      return next(new AppError("Vui lòng nhập đủ thông tin", 400))
    }
    else if (!isCheckEmail) {
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
const logout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(new AppError("Đăng xuất thất bại", 400))
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({
        status: 'OK',
        message: 'Đăng xuất thành công'
      })
    })
  } catch (error) {
    next(error)
  }
}



const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email) {
      return next(new AppError("Vui lòng nhập đầy đủ", 400))
    }
    else if (!isCheckEmail) {
      return next(new AppError("Vui lòng nhập đúng kí tự", 400))
    }
    const result = await UserService.sendOTP(email)
    console.log(result);

    return res.status(200).json(result)

  } catch (error) {
    next(error)
  }
}

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email || !otp || !newPassword) {
      return next(new AppError("Vui lòng nhập đầy đủ thông tin", 400))
    }
    else if (!isCheckEmail) {
      return next(new AppError("Vui lòng nhập đúng kí tự", 400))
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
  getDetailUser
}