const mongoose = require("mongoose")
require("./userSchema")
require("./productSchema")


const cartSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    product_quantiy: {
        type: Number,
        require: true,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    product_name: {
        type: Number,
        require: true,
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