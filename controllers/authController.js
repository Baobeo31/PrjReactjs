const UserService = require('../services/UserService')
const mailer = require('nodemailer')
const createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({ // DÙng để trả kết quả từ server về client
        status: 'Error',
        message: 'Vui lòng nhập đầy đủ'
      })
    }
    else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'Error',
        message: 'Hãy nhập đúng Email'
      })
    }
    else if (password != confirmPassword) {
      return res.status(200).json({
        status: 'Error',
        message: 'Mật khẩu chưa khớp'
      })
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email || !password) {
      return res.status(200).json({
        status: 'Error',
        message: 'Vui lòng nhập đầy đủ'
      })
    }
    else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'Error',
        message: 'Hãy nhập đúng Email'
      })
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
    return res.status(404).json({
      message: error.message

    })
  }
}
const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(404).json({
          status: 'ERROR',
          message: 'Đăng xuất thất bại'
        })
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({
        status: 'OK',
        message: 'Đăng xuất thành công'
      })
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}



const sendOTP = async (req, res) => {
  try {
    const { email } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Vui lòng nhập đầy đủ'
      })
    }
    else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Hãy nhập đúng email'
      })
    }
    const result = await UserService.sendOTP(email)
    console.log(result);

    return res.status(200).json(result)

  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);

    const isCheckEmail = reg.test(email)
    if (!email || !otp || !newPassword) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Vui lòng nhập đầy đủ'
      })
    }
    else if (!isCheckEmail) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Nhập đúng email'
      })
    }
    const result = await UserService.verifyOTPandResetPass(email, otp, newPassword)
    console.log(result);

    return res.status(200).json(result)
  } catch (error) {
    return res.status(200).json({
      message: error
    })
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy ID người dùng'
      });
    }
    const detailUser = await UserService.getDetailUser(userId)
    return res.status(200).json(detailUser)
  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy ID người dùng'
      });
    }
    const updateUser = await UserService.updateUser(userId, data);
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Không thấy ID người dùng'
      });
    }
    const deleteResponse = await UserService.deleteUser(userId);
    return res.status(200).json(deleteResponse);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
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