const cartSchema = require('../modles/cart')

// add product to cart 
const addItemCart = async (req, res) => {
    try {
        const cartAdd = new cartSchema(req.body)
        cartAdd.userId = req.params.userid
        cartAdd.productId = req.params.productid
        await cartAdd.save()
        if (cartAdd != null) {
            res.status(200).json({
                success: true,
                message: "product added to cart sucessfully",
                cartwala: cartAdd
            })
        } else {
            res.status(200).json({
                success: true,
                message: "product added to cart sucessfully"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error occur " + err.message,
        });
    }
}

// Show all cart Items Get API
const cartItemList = async (req, res) => {
    try {
        const isCart = await cartSchema.find().populate({ path: "productId", select: "product_name" });
        if (isCart) {
            res.status(200).json({
                success: true,
                message: "The displayed lists of cart is here.",
                getCart: isCart
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Not  displayed  Try Again .",
                getCart: isCart
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
const updateCartItem = async (req, res) => {
    try {
        const { _id } = req.params
        const { product_quantiy } = req.body
        const upgradeProduct = await cartSchema.findByIdAndUpdate({ _id }, req.body);
        if (upgradeProduct != null) {
            await cartSchema.findByIdAndUpdate(_id),
            {
                $set: {
                    product_quantiy: product_quantiy
                },
            };
            await upgradeProduct.save();
            return res.status(200).json({
                success: true,
                message: "product updated successfully"
            })

        } else {
            res.status(404).json({
                success: false,
                message: "no such product updated try again"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}


// delete item from cart API
const deleteItemCart = async (req, res) => {
    const productId = req.params.productId;

    try {
        const cartItemDelete = await cartSchema.findByIdAndDelete(productId);
        if (cartItemDelete != null) {
            res.status(201).json({
                success: true,
                message: "Cart  is deleted successfully!!",
            })
        } else {
            res.status(201).json({
                success: false,
                message: "Try again cart item not deleted  !!",
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
    updateCartItem,
    deleteItemCart
}
