const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    addressType : {
        type : String,
        required : true
    }
}, {timestamps : true});

const addressModel = mongoose.model('addresses', AddressSchema);
module.exports = addressModel;