const product = require("../models/product")
const category = require('../models/category')

//GET
const getAllCategoryProducts = async (req, res) => {
    const cat = req.params.category
  try {
    const Category = await category.find({name:cat})
    const {_id} = Category[0]
    const products = await product.find({ category: _id })
    if (products == []) return res.error("No products")
    res.status(200).json(products)
  } catch (error) {
    res.error(error)
  }
}

//get category
const getAllCategories = async(req,res)=>{
  try {
    const Category = await category.find()
    res.status(200).json(Category)
  } catch (error) {
    res.status(500).json(error)
  }
}
//PUT
const changeCategory = async (req, res) => {
    const id = req.params.category
  const {name} =  req.body
  try {
    const newCategory = await category.findbyIdAndUpdate(id,{name:name})
    res.status(200).json(newCategory)
  } catch (error) {
    res.error(error)
  }
}
//DELETE
const deleteCategory = async (req, res) => {
    const id = req.params.category
  try {
    const deletedCategory = await category.findByIdAndDelete(id)
    res.status(200).json(deletedCategory)
  } catch (error) {
    res.error(error)
  }
}

//POST
const createCategory = async (req, res) => {
    const {name} = req.body
  try {
    const newCategory = await category.create({ name: name })
    res.status(201).json(newCategory)
  } catch (error) {
    res.error(error)
  }
}

module.exports = {
  getAllCategoryProducts,
  createCategory,
  changeCategory,
  deleteCategory,
  getAllCategories,
}
