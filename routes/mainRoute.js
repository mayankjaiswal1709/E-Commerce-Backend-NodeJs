const express = require('express')
const router = express.Router()

const userRoutes = require('../routes/userRoutes')
const productRoutes = require('../routes/productRoutes')
const reviewRoutes = require('../routes/reviewRoute')
const cartRoutes = require('../routes/cartRoute')

router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/review', reviewRoutes)
router.use('/cart', cartRoutes)

module.exports = router 