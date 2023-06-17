const mongoose = require("mongoose")
require("./userSchema")
require("./productSchema")


const cartSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "products"
    },
    product_quantiy: {
        type: Number,
        require: true,
        default: 1,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"user"
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