const bcrypt = require('bcrypt')

const User = require("../models/user")
const {genToken } = require('../middleware/token')

const login=async(req,res)=>{
    const {email,password} = req.body
    try {
      const user = await User.find({ email })

      if (!user) return res.status(400).json("invalid credentials")

      const Userpassword = user[0].password
      const isValidUser = await bcrypt.compare(password, Userpassword)

      if (!isValidUser) res.status(404).json("invalid credentials")

      const token = await genToken(email)
      res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
      res.status(201).json(user)

    } catch (error) { 
      res.status(500).json(error.message)
    }
}

const signUp=async(req,res)=>{
    const {email,name,password} = req.body
    try {
        if(!email || !name || !password) return res.status(500).json('fill all fields')

        const UserExists = await User.find({email:email})
        if(UserExists==[]) return res.status(500).json("already exists")

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await User.create({email,name,password:hashedPassword})

        const token = await genToken(email)

        res.cookie("token", token, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        })
        res.status(201).json(user)
        
    } catch (error) {
      res.status(500).json(error.message)
    }

}

const logout = async (req, res) => {
  res.clearCookie("token")
  try {
    res.redirect(process.env.FRONTEND_URL)
  } catch (error) {
    res.status(500).json(error.message)
  }
}



module.exports={login,signUp, logout}