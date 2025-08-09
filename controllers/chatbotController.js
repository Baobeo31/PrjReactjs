const askGemini = require('../services/ChatBotService')
const AppError = require('../utils/AppError')
const handleAskChatbot = async (req, res, next) => {
  const { question } = req.body
  const result = await askGemini(question)

  if (result.status === "Error") {
    return next(new AppError('Lỗi'), 400)
  }
  return res.status(200).json(result)
}

module.exports = handleAskChatbot