const User = require('../models/User')
const bcrypt = require('bcrypt')
const mailer = require('nodemailer');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, username, password } = newUser
    try {
      if (!email || !password) {
        return resolve({
          status: 'Err',
          message: 'Vui lòng điền đầy đủ thông tin'
        })
      }
      if (typeof (password) !== 'string' || password.trim() === '') {
        return resolve({
          status: 'Err',
          message: 'Sai kí tự'
        })
      }
      const checkUser = await User.findOne({ email })
      console.log(checkUser);

      if (checkUser) {
        return resolve({
          status: 'Err',
          message: 'EMail đã tồn tại'
        })
      }
      const hash = await bcrypt.hash(password, 10)
      const createUser = await User.create({
        username,
        email,
        password: hash,
      })
      return resolve({
        status: 'OK',
        message: 'Success',
        data: createUser
      })
    } catch (error) {
      reject(error)
    }
  })
}

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin
    try {
      const checkUser = await User.findOne({ email })
      if (checkUser === null) {
        return resolve({
          status: 'Error',
          message: 'Không tìm thấy người dùng'
        })
      }
      const comparePassword = await bcrypt.compare(password, checkUser.password)
      if (!comparePassword) {
        return resolve({
          status: 'Error',
          message: 'Sai mật khẩu'
        })
      }
      const access_token = await generalAccessToken({ // ví dụ access_token 
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })


      return resolve({
        status: 'OK',
        message: 'SUCCESS',
        access_token,
        refresh_token
      })

    } catch (error) {
      reject(error)
    }
  })
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6 chữ số
}

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }

  })
  console.log(process.env.EMAIL);
  console.log(process.env.PASSWORD);


  const mailOption = {
    from: 'mgbdev2003@gmail.com',
    to,
    subject,
    html: htmlContent
  };
  await transporter.sendMail(mailOption)
}


const sendOTP = (email) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email })
    try {
      if (!user) {
        return resolve({
          status: "error",
          message: "Email không tồn tại"
        })
      }
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000)//5 phút
      user.otp = otp
      user.otpExpires = otpExpires
      await user.save()
      //Gửi email
      const subject = "MÃ OTP của bạn "
      const htmlContent = `<h3>Mã OTP của bạn là: <strong>${otp}</strong></h3><p>Có hiệu lực trong 5 phút</p>`
      await sendEmail(email, subject, htmlContent)


      console.log(`OTP gửi tới ${email}: ${otp}`);
      return resolve({
        status: 'OK',
        message: 'OTP đã được gửi'
      })
    } catch (error) {
      return reject(error)
    }
  })
}
const verifyOTPandResetPass = (email, otp, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return resolve({
          status: 'ERROR',
          message: 'Không tìm thấy email',
        })
      }
      if (user.otp !== otp) {
        return resolve({
          status: 'ERROR',
          message: 'Sai OTP',
        })
      }
      if (user.otpExpires < Date.now()) {
        return resolve({
          status: 'ERROR',
          message: 'Mã OTP đã hết hạn'
        })
      }
      if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
        return resolve({
          status: 'ERROR',
          message: 'Mật khẩu mới không hợp lệ'
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      user.password = hashedPassword
      user.otp = null
      user.otpExpires = null
      await user.save()

      return resolve({
        status: 'OK',
        message: 'SUCCESS',
      })
    } catch (error) {
      return reject(error)
    }

  })
}

const updateUser = (UserId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: UserId });
      if (!user) {
        return resolve({
          status: 'ERROR',
          message: 'Không tìm thấy người dùng'
        })
      }
      const updateUser = await User.findByIdAndUpdate(UserId, data, { new: true });
      return resolve({
        status: 'OK',
        message: 'Cập nhật thành công',
        data: updateUser
      })
    } catch (error) {

    }
  })
}
const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return resolve({
          status: 'ERROR',
          message: 'Không tìm thấy người dùng'
        })
      }
      await User.findByIdAndDelete(userId);
      return resolve({
        status: 'OK',
        message: 'Xoá thành công'
      })
    } catch (error) {
      return reject(error)
    }
  })
}
const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();
      return resolve({
        status: 'OK',
        message: 'Lấy danh sách người dùng thành công',
        data: users
      })
    } catch (error) {
      return reject(error)
    }
  })
}
const getDetailUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: userId });
      if (!checkUser) {
        return resolve({
          status: 'ERROR',
          message: 'Không tìm thấy người dùng'
        })
      }
      return resolve({
        status: 'OK',
        message: 'Lấy thông tin người dùng thành công',
        data: checkUser
      })
    } catch (error) {

    }
  })
}

module.exports = { createUser, loginUser, sendOTP, verifyOTPandResetPass, deleteUser, updateUser, getAllUsers, getDetailUser }