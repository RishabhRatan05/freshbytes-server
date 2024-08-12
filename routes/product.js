const express = require("express")
const {
  getAllProducts,
  getProduct,
  createProduct,
  changeProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/product")
const upload = require("../middleware/multer")

const app = express.Router()

app.route("/").get(getAllProducts).post(upload.single("file"), createProduct)

app.get("/all", getAdminProducts)
app.route("/:id").get(getProduct).put(changeProduct).delete(deleteProduct)

module.exports = app
