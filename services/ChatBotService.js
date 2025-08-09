const { GoogleGenerativeAI } = require('@google/generative-ai')
const AppError = require('../utils/AppError')
const Product = require('../models/Product')
require("dotenv").config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const askGemini = async (question) => {
  try {
    const questionTrimed = (question || '').trim()
    if (!questionTrimed) {
      throw new AppError('Câu hỏi bị trống', 400)
    }
    const productData = await Product.find({}, "name price").lean();
    const productList = productData
      .map(p => `${p.name} - ${p.price.toLocaleString("vi-VN")} VNĐ`)
      .join("\n")


    const prompt = `Bạn là một trợ lý bán hàng thông minh của cửa hàng công nghệ Techno
    Dưới đây là danh sách sản phẩm hiện có:
    ${productList}

    Nhiệm vụ: 
    -Gợi ý sản phẩm phù hợp theo tiêu chí người dùng(giá rẻ, hiệu năng, thương hiệu)
    -Trả lời ngắn gọn , dễ hiểu bằng tiếng Việt
    -Nếu không rõ nhu cầu, hãy hỏi lại

    Câu hỏi khách hàng:
    "${questionTrimed}"
      Hãy phản hồi như người thật 
    `
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const results = await model.generateContent(prompt)
    const text = results.response.text();

    return {
      status: "ok",
      reply: text
    }
  } catch (error) {
    throw error
  }
}

module.exports = askGemini