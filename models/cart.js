const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    items:[{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    }],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})  

module.exports = mongoose.models.Cart || mongoose.model('Cart',cartSchema)