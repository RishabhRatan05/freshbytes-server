const express = require("express")
const {} = require("../controllers/order")

const app = express.Router()

app.get("/")
app.route("/admin").get().post().put().delete()

module.exports = app
