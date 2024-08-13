const express = require("express")
const { getUser } = require("../controllers/user")

const app = express.Router()

app.get("/", getUser)

module.exports = app
