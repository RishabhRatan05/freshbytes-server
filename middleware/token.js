const jwt = require('jsonwebtoken')
const genToken = async(email)=>{
    try {
        const token = await jwt.sign(email,process.env.JWT_SECRET)
        return token
        
    } catch (error) {
        return error
    }
}

const getEmail = async(token)=>{
    try {
        const email = await jwt.verify(token,process.env.JWT_SECRET)
        return email
    } catch (error) {
        return error
    }
}

module.exports = {genToken, getEmail}