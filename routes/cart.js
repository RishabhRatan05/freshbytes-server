const express = require('express')
const { createCart, addToCart } = require('../controllers/cart')

const app = express.Router()

app.route('/')
        .get()
        .post(createCart)
        .put(addToCart)
        .delete()



module.exports = app