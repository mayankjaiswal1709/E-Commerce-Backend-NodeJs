const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

    cart_Id: {
        type: Number
    },
    product_Id: {
        type: Number,
        require: true,
    },
    user_Id: {
        type: Number,
        require: true,
    },
    product_name: {
        type: Number,
        require: true,
    },
    product_quantiy: {
        type: String,
        requier: true,
    },
    product_status: {
        type: String,
        require: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }

})
cartSchema.set('timestamps', true)
module.exports = mongoose.model('cart', cartSchema)