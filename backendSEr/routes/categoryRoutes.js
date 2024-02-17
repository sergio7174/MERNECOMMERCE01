const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createCategoryCtrl, updateCategoryCtrl, getCategoryCtrl, getSingleCategoryCtrl, deleteCategoryCtrl } = require('../controllers/categoryControllers');

const router = express.Router();

//create-category route
router.post('/create-category', authMiddlewares, createCategoryCtrl);

//update-category route
router.put('/update-category/:id', authMiddlewares, updateCategoryCtrl);

//getAllCategory route
router.get('/get-all-category', getCategoryCtrl);

//getSingleCategory route
router.get('/get-single-category/:slug', getSingleCategoryCtrl);

//delete category
router.delete('/delete-category/:id', authMiddlewares, deleteCategoryCtrl)

module.exports = router;