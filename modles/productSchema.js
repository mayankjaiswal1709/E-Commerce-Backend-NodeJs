const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    product_Id: {
        type: Number
    },
    product_name: {
        type: String,
        require: true,
    },
    product_description: {
        type: String,
        require: true,
    },
    product_price: {
        type: Number,
        require: true,
    },
    product_categories: {
        type: String,
        require: true,
    },
    product_image: {
        type: String,
        requier: true,
    },
    product_company: {
        type: String,
        require: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }

})
userSchema.set('timestamps', true)
module.exports = mongoose.model('products', productSchema)