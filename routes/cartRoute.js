const express = require('express')
const router = express.Router()
const cart = require('../controllers/cartControllers')

router.post('/addproducttocart', cart.addItemCart)
router.get('/listproducttocart', cart.cartItemList)
router.patch('/updateproducttocart', cart.editItemCart)
router.delete('/deleteproducttocart', cart.deleteItemCart)

module.exports = router


