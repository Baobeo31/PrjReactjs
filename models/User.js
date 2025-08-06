const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  refreshToken: { type: String, default: '' },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false }, //Xác thực bằng email mỗi khi đăng kí
  emailVerificationToken: String, // Token xác thực email
  emailVerificationExprires: Date, // thời hạn cho token email
  authType: { type: String, enum: ['local', 'google'], default: 'local' },
}, { timestamps: true }) // tự tạo createAt/updateAt


const User = mongoose.model('Account', UserSchema)
module.exports = User 