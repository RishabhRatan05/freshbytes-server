const Category = require("../models/category")
const Product = require("../models/product")
const { uploadImage } = require("../utils/cloudinary")

const getAllProducts = async (req, res) => {
  res.cookie("hello", "hhhheello")
  let toShow = []
  try {
    const categories = await Category.find()
    const allProducts = await Promise.all(
      categories.map(async (category) => {
        const list = {}
        const name = category.name
        const categoryId = category._id
        list.name = name
        list.products = await Product.find({ category: categoryId }).limit(5)
        toShow.push(list)
      })
    )
    res.status(200).json(toShow)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get products for admin
const getAdminProducts = async (req, res) => {
  let toShow = []
  try {
    const categories = await Category.find()
    const allProducts = await Promise.all(
      categories.map(async (category) => {
        const list = {}
        const name = category.name
        const categoryId = category._id
        list.name = name
        list.products = await Product.find({ category: categoryId })
        toShow.push(list)
      })
    )
    res.status(200).json(toShow)
  } catch (error) {
    res.status(500).json(error)
  }
}
//  :id

//GET
const getProduct = async (req, res) => {
  const { id } = req.params.id
  try {
    const Product = await product.findById(id)
    if (!Product) return res.json("No product")
    res.status(200).json(Product)
  } catch (error) {
    res.status(500).json(error)
  }
}

//POST
const createProduct = async (req, res) => {
  const imageUrl = await uploadImage(req.file.filename)
  const {
    name,
    category: categoryName,
    quantity,
    price,
  } = JSON.parse(req.body.data)
  try {
    let categoryN = await Category.find({ name: categoryName })
    let categoryId
    if (categoryN.length == 0) {
      categoryN = await Category.create({ name: categoryName })
      const { _id } = categoryN
      categoryId = _id
    } else {
      const { _id } = categoryN[0]
      categoryId = _id
    }
    const product = await Product.create({
      name: name,
      category: categoryId,
      quantity: quantity,
      price: price,
      imageUrl: imageUrl,
    })
    const { _id: productId } = product
    await Category.findByIdAndUpdate(categoryId, {
      $push: { products: productId },
    })
    if (!product) return res.json("Could not create product")
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

//PUT
const changeProduct = async (req, res) => {
  const id = req.params.id
  const { name, price } = req.body
  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price,
    })
    if (!product) return res.json("No product")
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

//DELETE
const deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) return res.json("Could not delete product")
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  changeProduct,
  deleteProduct,
  createProduct,
  getAdminProducts,
}
