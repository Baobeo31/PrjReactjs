const validator = require('validator')
const AppError = require('../utils/AppError')

const validatorPasswordStrength = (password) => {
  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })

  if (!isStrong) {
    throw new AppError('Mật khẩu phải có đu 8 kí tự, bao gồm 1 chữ hoa, chữ thường, số, và ký tự dặc biệt', 400)
  }
}


module.exports = validatorPasswordStrength