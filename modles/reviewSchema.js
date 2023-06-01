const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    
    },
    product_review: {
        type: String,
        require: true,
    },
    product_image: {
        type: String,
        requier: true,
    },
    product_rating: {
        type: String,
        require: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }

})
reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)