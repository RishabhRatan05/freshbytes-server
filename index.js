const express = require('express')
const cors = require('cors')
const CookieParser = require('cookie-parser')
const Razorpay =  require('razorpay')
require('dotenv').config()
const app  = express()
const PORT = process.env.PORT || 8000

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const cartRoutes = require('./routes/cart')
const connectDB = require('./utils/conn')

app.use(express.json())
app.use(cors({ credentials: true, origin :"*" }))
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))
app.use(CookieParser())

connectDB()
app.use('/',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)
app.use("/api/category", categoryRoutes)
app.use('/api/cart',cartRoutes)
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
)
module.exports= instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
})
app.listen(PORT,()=>{
    console.log(`listening on port : ${PORT}`)
})