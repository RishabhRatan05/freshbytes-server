const express = require("express")
const { getAllProducts, getProduct, createProduct, changeProduct, deleteProduct, getAdminProducts} = require("../controllers/product")

const app = express.Router()

app.route("/")
        .get(getAllProducts)
        .post(createProduct)

app.get('/all',getAdminProducts)
app.route('/:id')
        .get(getProduct)
        .put(changeProduct)
        .delete(deleteProduct)


module.exports= app
