const validator = require('validator')
const AppError = require('./AppError')

const validatorPasswordStrength = (password) => {
  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  console.log('Kiểm tra mật khẩu: ', password);
  console.log('Kết quả validatỏr', isStrong);



  if (!isStrong) {
    throw new AppError('Mật khẩu phải có đủ 8 kí tự, bao gồm 1 chữ hoa, chữ thường, số, và ký tự đặc biệt', 400)
  }
}


module.exports = validatorPasswordStrength