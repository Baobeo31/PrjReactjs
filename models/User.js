const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  otp: String,
  otpExpires: Date,
}, { timestamps: true }) // tự tạo createAt/updateAt


const User = mongoose.model('Account', UserSchema)
module.exports = User 