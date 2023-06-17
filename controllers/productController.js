const express = require("express");
const productSchema = require("../modles/productSchema");
const fs = require("fs")
const uploads = require('../middwlwear/imageStorage')

// FOR VENDOR ALL API'S 
// add product api
const addProduct = async (req, res) => {
    try {
        const newProduct = new productSchema(req.body);
        if (newProduct != null) {
            newProduct.product_image = `/uploads/${(req.file.filename)}`;
            await newProduct.save();
            res.status(200).json({
                success: true,
                message: "product added successfully"
            })
        } else {
            fs.unlinkSync(req.file.path)
            res.status(404).json({
                success: false,
                message: "no such data added"
            })
        }
    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

// get all  product 
const getProducts = async (req, res) => {
    try {
        const allproduct = await productSchema.find(req.body);
        if (allproduct) {
            res.status(200).json({
                success: true,
                message: "all product list below",
                productList: allproduct
            })
        } else {
            res.status(404)({
                success: false,
                message: "no product found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


// get all  product via name
const getProductsbyName = async (req, res) => {
    try {
        const { product_name } = req.params
        const allproduct = await productSchema.find({ product_name });
        if (allproduct) {
            res.status(200).json({
                success: true,
                message: "all product list below",
                productList: allproduct
            })
        } else {
            res.status(404)({
                success: false,
                message: "no product found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


// update product
const updateProduct = async (req, res) => {
    try {
        const { _id } = req.params
        const upgradeProduct = await productSchema.findByIdAndUpdate({ _id }, req.body);
        if (upgradeProduct != null) {
            await upgradeProduct.save();
            return res.status(200).json({
                success: true,
                message: "product updated successfully"
            })

        } else {
            res.status(404).json({
                success: false,
                message: "no such product"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

// delete product 
const deleteProduct = async (req, res) => {
    const { _id } = req.params
    const selectdeleteProduct = await productSchema.findByIdAndDelete({ _id }, req.body)
    try {
        if (selectdeleteProduct != null) {
            res.status(200).json({
                success: true,
                message: "your product deleted succrssfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "product not deleted try again"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}
module.exports = { addProduct, getProducts, getProductsbyName, updateProduct, deleteProduct };
