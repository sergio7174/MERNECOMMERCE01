const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createAddressCtrl, updateAddressCtrl, deleteAddressCtrl, getAllAddressCtrl } = require('../controllers/addressControllers');

const router = express.Router();

//routes
//create-address router
router.post('/create-address', authMiddlewares, createAddressCtrl);

//update-address router
router.put('/update-address/:id', authMiddlewares, updateAddressCtrl);

//delete-address router
router.delete('/delete-address/:id', authMiddlewares, deleteAddressCtrl);

//get-all-addresses router
router.get('/get-all-addresses', getAllAddressCtrl)

module.exports = router;
