const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: Number,
  description: String,
  sizes: [String],
  stock: { type: Number, default: 0 },
  img: String,
  category: String
});

module.exports = mongoose.model("Product", productSchema);
