const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    // address : {
    //     type : mongoose.ObjectId,
    //     ref : 'addresses'
    // },
    answer: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        default: false
    },
    wishlist: {
        type: Array
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;