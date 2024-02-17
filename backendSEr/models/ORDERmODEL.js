const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: "products",
    },
    ],
    payment: {
        type: String
    },
    totalAmt: {
        type: String
    },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]
    },
}, { timestamps: true });

const ORDERmODEL = mongoose.model("orders", orderSchema);
module.exports = ORDERmODEL;