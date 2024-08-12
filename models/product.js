const mongoose = require("mongoose")
const category = require("./category")

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  quantity: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
})

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema)
