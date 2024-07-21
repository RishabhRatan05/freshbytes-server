const express = require("express")
const { getAllCategoryProducts, createCategory, changeCategory, getAllCategories } = require("../controllers/category")

const app = express.Router()

app.route('/')
    .get(getAllCategories)
    .post(createCategory)

app.route("/:category")
    .get(getAllCategoryProducts)
    .put(changeCategory)
    .delete(changeCategory)

module.exports= app
