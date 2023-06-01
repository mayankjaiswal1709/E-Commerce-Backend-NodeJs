const express = require('express')
const router = express.Router()
const product = require('../controllers/productController')
const { upload } = require('../middwlwear/imageStorage')
const { isUser, isAdmin, isVendor } = require('../middwlwear/autherizaation')

router.post('/addproduct', upload.single("product_image"), isVendor, product.addProduct)
router.get('/allproduct', product.getProducts)
router.get('/productsvianame/:product_name', product.getProductsbyName)
router.patch('/updateproduct/:_id', isVendor, product.updateProduct)
router.delete('/deleteproduct/:_id', isVendor, product.deleteProduct)

module.exports = router;