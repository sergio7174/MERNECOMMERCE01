const express = require("express");
// const formidable = require('express-formidable');

// const { Readable } = require('stream');

const authMiddlewares = require("../middlewares/authMiddlewares");
const { createProductCtrl, getAllProductsCtrl, getSingleProductCtrl, getProductPhotoCtrl, deleteProductCtrl, updateProductCtrl, productFilterCtrl, productCategoryCtrl, braintreeTokenController, brainTreePaymentController, searchProductCtrl, decreaseProductQuantityCtrl, increaseProductQuantityCtrl, productTagCtrl } = require("../controllers/productControllers");

const router = express.Router();

//createProduct route
router.post('/create-product', authMiddlewares, createProductCtrl);

//updateProduct route
router.put('/update-product/:pid', authMiddlewares, updateProductCtrl);

//getAllProducts route
router.get('/get-all-products', getAllProductsCtrl);

//getSingleProduct route
router.get('/get-single-product/:slug', getSingleProductCtrl)

//getProductPhoto route
router.get('/get-product-photo/:pid', getProductPhotoCtrl)

//deleteProduct route
router.delete('/delete-product/:pid', authMiddlewares, deleteProductCtrl)

//filter product
router.post('/product-filters', productFilterCtrl)

//category wise products
router.get('/product-category/:slug', productCategoryCtrl)

//tag wise products
router.get('/product-tag/:slug', productTagCtrl)

//search products
router.get('/search/:keyword', searchProductCtrl)

//decreaseProductQuantityCtrl
router.get('/decrease-product-quantity/:id', decreaseProductQuantityCtrl)

//increaseProductQuantityCtrl
router.get('/increase-product-quantity/:id', increaseProductQuantityCtrl)

// payments routes
// token
router.get('/braintree/token', braintreeTokenController)

// payments
router.post('/braintree/payment', authMiddlewares, brainTreePaymentController)

module.exports = router;