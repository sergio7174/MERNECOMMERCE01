const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name : {
        type : String,
        // required : true
    },
    slug : {
        type : String,
        lowercase : true
    }
}, {timestamps : true});

const tagModel = mongoose.model('tags', tagSchema);
module.exports = tagModel;
