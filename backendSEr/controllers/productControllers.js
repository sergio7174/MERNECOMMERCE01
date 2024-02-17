const fs = require('fs')
const productModel = require("../models/productModel");
const slugify = require('slugify');
const categoryModel = require('../models/categoryModel');

const braintree = require('braintree');
const ORDERmODEL = require('../models/ORDERmODEL.js');
const tagModel = require('../models/tagModel');
// const orderModel = require('../models/ORDERmODEL');

//payment gateway
/*var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANTID,
    publicKey: process.env.BRAINTREE_PUBLICKEY,
    privateKey: process.env.BRAINTREE_PRIVATEKEY,
});
*/
//createProduct Ctrl
const createProductCtrl = async (req, res) => {
    try {
        const { name, slug, description, originalPrice, price, category, tag, quantity, shipping, isSpecial, photo } = req.body;
        //vaidation
        switch (true) {
            case !name:
                return res.status(500).send({ success: false, error: 'name is required' });
            case !description:
                return res.status(500).send({ success: false, error: 'description is required' });
            case !originalPrice:
                return res.status(500).send({ success: false, error: 'original price is required' });
            case !price:
                return res.status(500).send({ success: false, error: 'price is required' });
            case !category:
                return res.status(500).send({ success: false, error: 'category is required' });
            case !tag:
                return res.status(500).send({ success: false, error: 'tag is required' });
            case !quantity:
                return res.status(500).send({ success: false, error: 'quantity is required' });
            case !isSpecial:
                return res.status(500).send({ success: false, error: 'Special product is required' });
        }

        const product = new productModel({ ...req.body, slug: slugify(name) })
        
        await product.save();
        res.status(200).send({ success: true, message: 'Product created successfully', product })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `create product api issue : ${error}`, error })
    }
}

//updateProduct Ctrl
const updateProductCtrl = async (req, res) => {
    // console.log(req.fields);
    try {
        const { name, slug, description, originalPrice, price, category, tag, quantity, shipping, isSpecial, photo } = req.body;
        //vaidation
        switch (true) {
            case !name:
                return res.status(500).send({ success: false, error: 'name is required' });
            case !description:
                return res.status(500).send({ success: false, error: 'description is required' });
            case !originalPrice:
                return res.status(500).send({ success: false, error: 'original price is required' });
            case !price:
                return res.status(500).send({ success: false, error: 'price is required' });
            case !category:
                return res.status(500).send({ success: false, error: 'category is required' });
            case !tag:
                return res.status(500).send({ success: false, error: 'tag is required' });
            case !quantity:
                return res.status(500).send({ success: false, error: 'quantity is required' });
            case !isSpecial:
                return res.status(500).send({ success: false, error: 'Special product is required' });
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.body, slug: slugify(name) }, { new: true });
        await product.save();
        res.status(200).send({ success: true, message: 'Product updated successfully', product })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `update product api issue : ${error}`, error })
    }
}

//getAllProducts Ctrl
const getAllProductsCtrl = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category", "tag").limit(12).sort({ createdAt: -1 });
        res.status(200).send({ success: true, message: 'All products fetched successfully', total: products.length, products })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `get all products api issue : ${error}`, error })
    }
}

//getSingleProduct Ctrl
const getSingleProductCtrl = async (req, res) => {
    try {
        // const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category", "tags");
        const product = await productModel.findOne({ slug: req.params.slug }).populate("category").populate("tag");
        console.log(product);
        res.status(200).send({ success: true, message: 'Single Product Fetched Successfully', product })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `get single product api issue : ${error}`, error })
    }
}

//getProductPhoto Ctrl
const getProductPhotoCtrl = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `get product photo api issue : ${error}`, error })
    }
}

//deleteProduct Ctrl
const deleteProductCtrl = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({ success: true, message: 'Product Deleted Successfully', product });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `delete product api issue : ${error}`, error })
    }
}

//productFilterCtrl
const productFilterCtrl = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({ success: true, message: 'Product Filtered Successfully', products });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `product filter api issue : ${error}`, error })
    }
}

//productCategoryCtrl
const productCategoryCtrl = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        console.log(category);
        res.status(200).send({ success: true, message: 'fetched category wise products', category, products })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `product category filter api issue : ${error}`, error })
    }
}

//productTagCtrl
const productTagCtrl = async (req, res) => {
    try {
        const tag = await tagModel.findOne({ slug: req.params.slug });
        console.log(tag);
        const products = await productModel.find({ tag : tag._id });
        console.log(products);
        res.status(200).send({ success: true, message: 'fetched category wise products', tag, products })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `product category filter api issue : ${error}`, error })
    }
}

//searchProduct Ctrl
const searchProductCtrl = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");
        if(results){
            res.status(200).send({ success: true, results });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `search product filter api issue : ${error}`, error })
    }
}

//decrease quantity(onClick of add to cart btn)
const decreaseProductQuantityCtrl = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.id }).select("-photo");
        const productQuantity = product.quantity;
        const updatedProductQuantity = productQuantity - 1;
        // console.log(updatedProductQuantity);
        const updatedProduct = await productModel.findByIdAndUpdate(product._id, { quantity: updatedProductQuantity }).select("-photo");
        await updatedProduct.save();
        res.status(200).send({ success: true, message: 'Quantity decreased successfully', updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `decreaseProductQuantityCtrl filter api issue : ${error}`, error })
    }
}

//increaseProductQuantityCtrl(onClick of remove btn)
const increaseProductQuantityCtrl = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.id }).select("-photo");
        const productQuantity = product.quantity;
        const updatedProductQuantity = productQuantity + 1;
        const updatedProduct = await productModel.findByIdAndUpdate(product._id, { quantity: updatedProductQuantity }).select("-photo");
        await updatedProduct.save();
        res.status(200).send({ success: true, message: 'Quantity increased successfully', updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `increaseProductQuantityCtrl filter api issue : ${error}`, error })
    }
}

// payment gateway api
// token
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response);
                // console.log(response);
            }
        });
    } catch (error) {
        console.log(error)
    }

}
// payment
const brainTreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0
        cart.map((i) => {
            total += i.price
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, function (error, result) {
            console.log(error, "QWERTY");
            console.log(result, "abcde");
            if (result) {
                const order = new ORDERmODEL({
                    products: cart,
                    payment: result,
                    buyer: req.body.userId,
                    // buyer: req.user._id
                })
                order.save();
                console.log(newTransaction);
                console.log(order);
                console.log(order.products);
                console.log(order.payment);
                console.log(order.buyer)
                res.json({ ok: true })
            }
            else {
                res.status(500).send(error)
            }
        }
        )
    } catch (error) {
        console.log(error)
    }
}


module.exports = { createProductCtrl, updateProductCtrl, getAllProductsCtrl, getSingleProductCtrl, getProductPhotoCtrl, deleteProductCtrl, productFilterCtrl, productCategoryCtrl, productTagCtrl, searchProductCtrl, decreaseProductQuantityCtrl, increaseProductQuantityCtrl, braintreeTokenController, brainTreePaymentController }