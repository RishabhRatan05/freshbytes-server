const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
    // orders:{
        
    // }
})

module.exports = mongoose.models.User || mongoose.model('User',userSchema)