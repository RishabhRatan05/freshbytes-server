const User = require('../models/user')
const { getEmail } = require("../middleware/token")

const getUser = async (req, res) => {
  const token = req.cookies.token
  const email = await getEmail(token)
  try {
    if (!email )
      return res.status(500).json("no email found")

    const UserExists = await User.find({ email: email })
    if (UserExists == []) return res.status(500).json("already exists")

    res.status(201).json(UserExists)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = {getUser }
