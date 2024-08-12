const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  items: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
})

module.exports = mongoose.models.Order || mongoose.model("Cart", orderSchema)
