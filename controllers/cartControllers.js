const cartSchema = require('../modles/cart')

// add product to cart 
const addItemCart = async (req, res) => {
    try {
        const cartAdd = await new cartSchema(req.body)
        cartAdd.userId = req.params.userId
        cartAdd.productId = req.params.productId
        try {
            await cartAdd.save()
            res.status(201).json({
                success: true,
                message: "Cart added successfully"
            })
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "Error occur" + err.message,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error occur" + err.message,
        });
    }
}
// Show all cart Items Get API
const cartItemList = async (req, res) => {
    try {
        const existsCart = await cartSchema.find();
        if (existsCart) {
            res.status(200).json({
                success: true,
                message: "The displayed lists of cart is here.",
                getCart: existsCart
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Not  displayed  Try Again .",
                getCart: existsCart
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message

        })
    }
}
// Edit item form cart API
const editItemCart = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const newCart = await cartSchema.findByIdAndUpdate(cartId, { $set: req.body });
        if (newCart != null) {
            await newCart.save();
            res.status(201).json({
                success: true,
                message: "Cart item  edited successfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Cart item is not edited try again !! "
            })
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        })
    }
}
// delete item from cart API
const deleteItemCart = async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const cartDelete = await cartSchema.findByIdAndDelete(cartId, { $set: req.body });
        if (cartDelete != null) {
            res.status(201).json({
                success: true,
                message: "Cart is deleted successfully!!",
            })

        } else {
            res.status(201).json({
                success: true,
                message: "Try Again cart item not deleted  !!",
            })
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    addItemCart,
    cartItemList,
    editItemCart,
    deleteItemCart
}
