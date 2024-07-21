const express = require("express")
const app = express.Router()


const {login,signUp, logout} = require('../controllers/auth')

app.post("/login",login)
app.post('/signup',signUp)
app.get('/logout',logout)

module.exports = app
