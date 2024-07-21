const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products:[{
    type:mongoose.Types.ObjectId,
    ref:"Product"
  }]

})

module.exports =
  mongoose.models.Category || mongoose.model("Category", categorySchema)
