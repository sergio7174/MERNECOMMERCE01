const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares');
const { createTagCtrl, updateTagCtrl, deleteTagCtrl, getAllTagsCtrl, getSingleTagCtrl } = require('../controllers/tagControllers');

const router = express.Router();

//createTag Route
router.post('/create-tag', authMiddlewares, createTagCtrl);

//updateTag Route
router.put('/update-tag/:id', authMiddlewares, updateTagCtrl);

//deleteTag Route
router.delete('/delete-tag/:id', authMiddlewares, deleteTagCtrl);

//getAllTags Route
router.get('/get-all-tags', getAllTagsCtrl);

//getSingleTag route
router.get('/get-single-tag/:slug', getSingleTagCtrl);

module.exports = router;