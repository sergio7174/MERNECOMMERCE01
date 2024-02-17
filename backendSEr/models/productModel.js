const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    // tag : {
    //     type: String,
    //     required: true
    // },
    // tagSlug : {
    //     type: String,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'categories',
        required: true
    },
    tag: {
        type: mongoose.ObjectId,
        ref: 'tags',
        required: true
    },
    photo: {
        type: Array
    },
    shipping: {
        type: Boolean
    },
    isSpecial: {
        type: String,
        default: 'No',
        required: true
    }
}, { timestamps: true });

const productModel = mongoose.model('products', ProductSchema);
module.exports = productModel;