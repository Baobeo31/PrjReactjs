const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const generateOTP = require('../utils/generateOtp')
const sendEmail = require('../utils/email')
const crypto = require('crypto');

const createUser = async ({ email, username, password }) => {
  if (!email || !password) {
    throw new AppError('Vui lòng điền đầy đủ thông tin', 400);
  }
  if (typeof password !== 'string' || password.trim() === '') {
    throw new AppError('Mật khẩu không hợp lệ', 400);
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    throw new AppError('Email đã tồn tại', 400);
  }

  const hash = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString('hex')
  const exprire = new Date(Date.now() + 10 * 60 * 1000)// 10 phút
  const createdUser = await User.create({
    username,
    email,
    password: hash,
    isVerified: false,
    emailVerificationToken: token,
    emailVerificationExprires: exprire
  });

  const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${token}&email=${email}` //liên kết để xác minh 
  const subject = 'Xác minh địa chỉ Email'
  const html =
    `
  <p>Chào <strong>${username}</strong></p>
  <p>Vui lòng nhấn vô đường link để xác nhận địa chỉ email của bạn</p>
  <a href= "${verificationURL}">${verificationURL}</a>
  <p>Liên kết sẽ hết hạn sau 10 phút</p>
  `

  await sendEmail(email, subject, html)
  return {
    status: 'OK',
    message: 'Đăng ký thành công, vui lòng kiểm tra email để xác minh',
    data: createdUser,
  };
};

const loginUser = async ({ email, password }) => {
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    throw new AppError('Không tìm thấy người dùng', 400);
  }
  if (!checkUser.isVerified) {
    throw new AppError("Vui lòng xác minh email trước khi đăng nhập", 400)
  }

  const comparePassword = await bcrypt.compare(password, checkUser.password);
  if (!comparePassword) {
    throw new AppError('Sai mật khẩu', 400);
  }

  const access_token = generalAccessToken({
    id: checkUser.id,
    isAdmin: checkUser.isAdmin,
  });

  const refresh_token = generalRefreshToken({
    id: checkUser.id,
    isAdmin: checkUser.isAdmin,
  });

  await User.findByIdAndUpdate(checkUser.id, {
    refreshToken: refresh_token
  }) // Lưu refresh_token vô database

  return {
    status: 'OK',
    message: 'Đăng nhập thành công',
    access_token,
    refresh_token,
  };
}
const loginWithGoogle = async (user) => {

  const payload = { id: user._id, isAdmin: user.isAdmin }
  const access_token = generalAccessToken(payload)
  const refresh_token = generalRefreshToken(payload)

  return { access_token, refresh_token }
}

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: '' })
  return ({
    status: "OK",
    message: 'Đăng xuất thành công'
  })
}

const verifyEmail = async ({ email, token }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 400)
  }
  if (!email || !token) {
    throw new AppError("Thiếu email hoặc token xác minh", 400);
  }

  if (user.isVerified) {
    throw new AppError("Tài khoản đã được xác minh", 400)
  }
  if (
    user.emailVerificationToken !== token ||
    user.emailVerificationExprires < Date.now()
  ) {
    throw new AppError("TOken hết hạn hoặc không hợp lệ", 400)
  }

  user.isVerified = true
  user.emailVerificationToken = null
  user.emailVerificationExprires = null
  await user.save()
  return ({
    status: 'OK',
    message: "Xác minh email thành công"
  })
}
const resendVertificationEmail = async ({ email }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError("Không tìm thấy người dùng", 400)
  }
  const token = crypto.randomBytes(32).toString('hex')
  const exprire = new Date(Date.now() + 10 * 60 * 1000)

  user.emailVerificationToken = token,
    user.emailVerificationExprires = exprire
  await user.save()


  const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${token}&email=${email}`
  const subject = 'Xác minh lại địa chỉ email'
  const html =
    `
  <p>Chào<strong>${user.username}</strong></p>
  <p>Vui lòng nhấn vô liên kết để xác minh lại email của bạn</p>
  <a href="${verificationURL}">${verificationURL}</a>
  <p>Liên kết có hiệu lực trong 10 phút</p>
  `
  await sendEmail(email, subject, html)
  return ({
    status: 'OK',
    message: "Đã gửi xác mình lại email"
  })
}

const sendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Email không tồn tại', 400);
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  const subject = 'MÃ OTP của bạn';
  const htmlContent = `<h3>Mã OTP của bạn là: <strong>${otp}</strong></h3><p>Có hiệu lực trong 5 phút</p>`;
  await sendEmail(email, subject, htmlContent);

  return {
    status: 'OK',
    message: 'OTP đã được gửi',
  };
};

const verifyOTPandResetPass = async (email, otp, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Không tìm thấy email', 400);
  }

  if (user.otp !== otp) {
    throw new AppError('Sai OTP', 400);
  }

  if (user.otpExpires < Date.now()) {
    throw new AppError('Mã OTP đã hết hạn', 400);
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
    throw new AppError('Mật khẩu mới không hợp lệ', 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return {
    status: 'OK',
    message: 'Đặt lại mật khẩu thành công',
  };
};

const updateUser = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('Không tìm thấy người dùng', 404);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

  return {
    status: 'OK',
    message: 'Cập nhật thành công',
    data: updatedUser,
  };
};

const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('Không tìm thấy người dùng', 404);
  }

  await User.findByIdAndDelete(userId);

  return {
    status: 'OK',
    message: 'Xoá người dùng thành công',
  };
};

const getAllUsers = async () => {
  const users = await User.find().lean();
  return {
    status: 'OK',
    message: 'Lấy danh sách người dùng thành công',
    data: users,
  };
};

const getDetailUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('Không tìm thấy người dùng', 404);
  }

  return {
    status: 'OK',
    message: 'Lấy thông tin người dùng thành công',
    data: user,
  };
};

module.exports = {
  createUser,
  loginUser,
  sendOTP,
  verifyOTPandResetPass,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailUser,
  logout,
  verifyEmail,
  resendVertificationEmail,
  loginWithGoogle
};
