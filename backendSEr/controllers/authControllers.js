const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../models/productModel");
const ORDERmODEL = require("../models/ORDERmODEL");

//register Ctrl
const registerCtrl = async (req, res) => {

    console.log("Estoy en authcontroller - line 10 - registerCtrl")
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            res.status(200).send({ success: false, message: 'User already exists, please Sign-In' })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send({ success: true, message: 'Register Successful' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register api issue : ${error.message}`.bgRed.black, error })
    }
}

//login Ctrl
const loginCtrl = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ success: false, message: 'User not found' })
        }
        const isMatchedPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isMatchedPassword) {
            return res.status(200).send({ success: false, message: 'Invalid Credentials!' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "1d" })
        return res.status(200).send({ success: true, message: 'Login Successful', token, user })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Login api issue : ${error.message}`.bgRed.black, error })
    }
}

//forgotPassword Ctrl
const forgotPasswordCtrl = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ success: false, message: 'User not found' })
        }
        if (!(user.answer == req.body.answer)) {
            return res.status(200).send({ success: false, message: 'Invalid user or answer' })
        }
        user.password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).send({ success: true, message: 'Password Reset Successful' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Forgot Password api issue : ${error.message}`, error })
    }
}

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        const notAdminUsers = []
        if (users.length > 0) {
            users.map((user) => {
                if (user.isAdmin == 'false') {
                    user.password = null
                    notAdminUsers.push(user)
                }
            })
            res.status(200).send({ success: true, message: 'All users fetched Successful', users: notAdminUsers })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Get all users api issue : ${error.message}`.bgRed.white, error })
    }
}

//getUserData Ctrl
const getUserDataCtrl = async (req, res) => {
    console.log("Estoy en authControllers - line 92 -")
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        console.log("Estoy en authControllers - line 95 - user: "+user)

        if (!user) {
           res.status(200).send({ success: false, message: 'user not found' })
        }
        res.status(200).send({ success: true, user })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Login api issue : ${error.message}`.bgRed.white, error })
    }
}

//updateProfile Ctrl
const updateProfileCtrl = async (req, res) => {
    try {
        // const user = await userModel.findById(req.user._id);
        console.log(req.body)
        const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { ...req.body }, { new: true });

        res.status(200).send({ success: true, message: 'Profile Updated Successfully', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `updateProfile api issue : ${error.message}`.bgRed.white, error })
    }
}

// create orders
const createOrdersController = async (req, res) => {
    try {
        const order = new ORDERmODEL({
            ...req.body,
            buyer: req.body.userId
        })
        console.log(order)
        await order.save()
        res.status(200).send({ success: true, message: 'Order Successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating Orders",
            error,
        });
    }
}

//get orders
const getOrdersController = async (req, res) => {
    try {
        const user = userModel.findById(req.body.userId);
        const orders = await ORDERmODEL
            .find({ buyer: req.body.userId });
        const allOrders = []
        for (let i = 0; i < orders.length; i++) {
            const productItems = []
            for (let j = 0; j < orders[i].products.length; j++) {
                const product = await productModel.findById(orders[i].products[j])
                if (product) {
                    productItems.push(product)
                }
            }
            const ord = {
                totalAmt : orders[i].totalAmt,
                payment: orders[i].payment,
                products: productItems,
                status: orders[i].status,
                id: orders[i]._id,
                userName : user.name,
            }
            allOrders.push(ord)
        }
        console.log(allOrders)
        res.status(200).send({ success: true, message: 'Orders fetched Successfully', allOrders });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//   add product to user wishlist
const addToWishlist = async (req, res) => {
    const user = await userModel.findById({ _id: req.body.userId });
    if (!user) {
        res.status(200).send({ success: false, message: 'user not found' })
    }
    else {
        const product = await productModel.findById(req.body.productId)
        if (!product) {
            res.status(200).send({ success: false, message: 'product not found' })
        }
        else {
            user.wishlist.push(product)
            await user.save()
            res.status(200).send({ success: true, message: 'product added to wishlist' })
        }
    }
}

//   remove product from user wishlist
const removeFromWishlist = async (req, res) => {
    const user = await userModel.findById({ _id: req.body.userId });
    if (!user) {
        res.status(200).send({ success: false, message: 'user not found' })
    }
    else {
        const wishlist = []
        for (let i = 0; i < user.wishlist.length; i++) {
            if (user.wishlist[i]._id != req.body.productId) {
                wishlist.push(user.wishlist[i])
            }
        }
        user.wishlist = [...wishlist]
        await user.save()
        res.status(200).send({ success: true, message: 'product removed from wishlist' })
    }
}

//   get user wishlist 
const getAllWishlist = async (req, res) => {
    const user = await userModel.findById({ _id: req.body.userId });
    if (!user) {
        res.status(200).send({ success: false, message: 'user not found' })
    }
    else {
        res.status(200).send({ success: true, message: 'wishlist fetched!', wishes: user.wishlist })
    }
}

module.exports = { loginCtrl, registerCtrl, forgotPasswordCtrl, getAllUsers, getUserDataCtrl, updateProfileCtrl, createOrdersController, getOrdersController, addToWishlist, removeFromWishlist, getAllWishlist };