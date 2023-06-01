const express = require('express')
const reviewSchema = require('../modles/reviewSchema')
const uploads = require('../middwlwear/imageStorage')
const fs = require('fs')

// add Review api
const addReview = async (req, res) => {
    try {
        const reviewData = new reviewSchema(req.body);
        if (reviewData != null) {
            reviewData.product_image = `/uploads/${(req.file.filename)}`;
            reviewData.userId = req.userId;
            reviewData.productId = req.params.pid;
            await reviewData.save();
            res.status(200).json({
                success: true,
                message: "Review Added Successfully",
                review: reviewData,
            })
        } else {
            fs.unlinkSync(req.file.path)
            res.status(404).json({
                success: false,
                message: "no review added try again "

            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error occur ${error.stack}`,
        });
    }
};

// see  all reviews
const getReviews = async (req, res) => {
    try {
        const allReviewList = await reviewSchema.find(req.body)
        if (allReviewList != null) {
            return res.status(200).json({
                sucess: true,
                message: "your all review list below",
                reviewList: allReviewList
            })

        } else {
            res.status(404).json({
                success: false,
                message: "No Review Found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurs${error.message}`
        })
    }
}

// edit review 
const editReview = async (req, res) => {
    try {
        const { _id } = req.params
        const reviewedit = await reviewSchema.findByIdAndUpdate({ _id }, req.body)
        if (reviewedit != null) {
            await reviewedit.save()
            res.status(200).json({
                success: true,
                message: "review added successfull ",
                reviewedit: reviewedit
            })
        } else {
            res.status(404).json({
                success: false,
                message: "No review edited and updated try again "
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// delete reveiw 
const deleteReview = async (req, res) => {
    try {
        const { _id } = req.params
        const Reviewdeleted = await reviewSchema.findByIdAndDelete({ _id }, req.body)
        if (Reviewdeleted != null) {
            res.status(200).json({
                success: true,
                message: "review deleted successfully",
                show:Reviewdeleted
            })
        } else {
            res.success(404).json({
                success: false,
                message: "No review deleted try again"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports = { addReview, getReviews, editReview, deleteReview }


