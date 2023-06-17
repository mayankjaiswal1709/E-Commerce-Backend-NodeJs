const express = require('express')
const router = express.Router()
const cart = require('../controllers/cartControllers')

router.post('/addproducttocart/:userid/:productid', cart.addItemCart)
router.get('/listproducttocart', cart.cartItemList)
router.patch('/updateproducttocart/:_id', cart.updateCartItem)
router.delete('/deleteproducttocart/:productId', cart.deleteItemCart)

module.exports = router


