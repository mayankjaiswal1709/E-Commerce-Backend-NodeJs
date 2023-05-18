const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({

    review_Id: {
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
    product_review: {
        type: Number,
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