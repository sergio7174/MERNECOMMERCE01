const express = require("express");
const { loginCtrl, registerCtrl, getUserDataCtrl, forgotPasswordCtrl, updateProfileCtrl, getOrdersController, addToWishlist, removeFromWishlist, getAllWishlist, getAllUsers, createOrdersController } = require("../controllers/authControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

//routes
//register route
router.post('/register', registerCtrl)

//login route
router.post('/login', loginCtrl)

//forgot-password route
router.post('/forgot-password', forgotPasswordCtrl)

//getUserData route
router.post('/getUserData', authMiddlewares, getUserDataCtrl);

// get all users
router.get('/all-users', authMiddlewares, getAllUsers);

//update profile route
router.put('/profile', authMiddlewares, updateProfileCtrl)

// create orders
router.post('/orders/add-new', authMiddlewares, createOrdersController);

// get orders
router.get('/orders', authMiddlewares, getOrdersController);

// add to wishlist
router.post('/wishlist/add', authMiddlewares, addToWishlist)

// remove from wishlist
router.post('/wishlist/remove', authMiddlewares, removeFromWishlist)

// get wishlist
router.get('/wishlist', authMiddlewares, getAllWishlist)

module.exports = router;