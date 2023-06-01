const review = require('../controllers/reviewControlers')
const express = require('express')
const { upload } = require('../middwlwear/imageStorage')
const router = express.Router()
const { isUser, isAdmin, isVendor } = require('../middwlwear/autherizaation')

router.post('/addreview', upload.single('product_image'), review.addReview)
router.get('/getallreview', review.getReviews)
router.patch('/updatereview/:_id', review.editReview)
router.delete('/deltereview/:_id', isAdmin, review.deleteReview)

module.exports = router
