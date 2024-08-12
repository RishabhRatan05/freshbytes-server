const { getEmail } = require("../middleware/token")
const cart = require("../models/order")
const user = require("../models/user")

//GET
const getCart = async (req, res) => {
  const { token: cartId } = req.body
  try {
    const Cart = await cart.findById(cartId)
    res.staus(200).json(Cart)
  } catch (error) {
    res.error(error)
  }
}

//POST
const createOrder = async (req, res) => {
  const { products, token } = req.body
  const email = getEmail(token)
  try {
    const User = await user.find({ email })
    const { _id: ownerId } = User
    const Cart = await cart.create({ owner: ownerId, items: products })
    const { _id: cartId } = Cart
    res.cookie("cart", cartId)
    res.status(201).json("Cart Created")
  } catch (error) {
    res.error(error)
  }
}

//PUT
const addToCart = async (req, res) => {
  const { product, token: cartId } = req.body
  try {
    const Cart = await cart.findById(cartId)
    const { items } = Cart
    items.push(product)
    const newCart = await cart.findByIdAndUpdate(cartId, { items })
    res.status(201).json(newCart)
  } catch (error) {
    res.error(error)
  }
}

//DELETE
const deleteCart = async (req, res) => {
  const { token: cartId } = req.body
  try {
    const Cart = await cart.findByIdAndDelete(cartId)
    res.status(200).json("Cart Deleted")
  } catch (error) {
    res.error(error)
  }
}

module.exports = { createOrder }
