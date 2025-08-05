const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  brand: { type: String, require: true },
  rating: { type: Number, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  image: { type: String, require: true },
  countInStock: { type: Number, require: true },
  price: { type: Number, require: true },
  discountPrice: { type: Number },
  selled: { type: Number, default: 0 } // Số lượng đã bán
}, {
  timestamps: true
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product