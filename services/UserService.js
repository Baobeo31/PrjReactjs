const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { generalAccessToken, generalRefreshToken } = require('../middleware/JwtService');

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
  const createdUser = await User.create({
    username,
    email,
    password: hash,
  });

  return {
    status: 'OK',
    message: 'Tạo người dùng thành công',
    data: createdUser,
  };
};

const loginUser = async ({ email, password }) => {
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    throw new AppError('Không tìm thấy người dùng', 400);
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

  return {
    status: 'OK',
    message: 'Đăng nhập thành công',
    access_token,
    refresh_token,
  };
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
};

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

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
  const users = await User.find();
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
};
