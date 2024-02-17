const colors = require('colors');
const addressModel = require('../models/addressModel');

//createAddressCtrl
const createAddressCtrl = async (req, res) => {
    try{
        const address = new addressModel(req.body);
        await address.save();

        return res.status(200).send({success : true, message : `${address.addressType} address created successfully`, address});
    }catch(error){
        console.log(error);
        res.status(500).send({success : false, message : `Error in createAddressCtrl api : ${error.message}`.bgRed});
    }
}

//updateAddressCtrl
const updateAddressCtrl = async (req, res) => {
    try{
       const address = await addressModel.findByIdAndUpdate(req.params.id, {...req.body}, {new : true});
        await address.save();

        return res.status(200).send({success : true, message : `${address.addressType} address updated successfully`, address});
    }catch(error){
        console.log(error);
        res.status(500).send({success : false, message : `Error in updateAddressCtrl api : ${error.message}`.bgRed});
    }
}

//deleteAddressCtrl
const deleteAddressCtrl = async ( req, res) => {
    try{
        const address = await addressModel.findByIdAndDelete(req.params.id);
         return res.status(200).send({success : true, message : `address deleted successfully`, address});
     }catch(error){
         console.log(error);
         res.status(500).send({success : false, message : `Error in deleteAddressCtrl api : ${error.message}`.bgRed});
     }
}

//getAllAdressCtrl
const getAllAddressCtrl = async (req, res) => {
    try{
        const addresses = await addressModel.find({});
        return res.status(200).send({success : true, message : `addresses fetched successfully`, addresses});
     }catch(error){
         console.log(error);
         res.status(500).send({success : false, message : `Error in getAllAddressCtrl api : ${error.message}`.bgRed});
     }
}

module.exports = { createAddressCtrl, updateAddressCtrl, deleteAddressCtrl, getAllAddressCtrl }