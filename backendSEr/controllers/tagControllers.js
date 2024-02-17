const slugify = require("slugify");
const tagModel = require("../models/tagModel");

// createTagCtrl
const createTagCtrl = async (req, res) => {
    try {
        const tag = await tagModel.findOne({ name: req.body.name });
        if (tag) {
            return res.status(200).send({ success: true, message: `${tag.name} already exists` });
        }
        if (req.body.slug) {
            const tag = new tagModel({ name: req.body.name, slug: slugify(req.body.slug) });
            await tag.save();
            return res.status(200).send({ success: true, message: `${tag.name} created successfully`, tag })
        } else {
            const tag = new tagModel({ name: req.body.name, slug: slugify(req.body.name) });
            await tag.save();
            return res.status(200).send({ success: true, message: `${tag.name} created successfully`, tag });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: `Error in createTagCtrl api ${error.message}`, error })
    }
}

// updateTagCtrl
const updateTagCtrl = async (req, res) => {
    try {
        if (req.body.slug) {
            const tag = await tagModel.findByIdAndUpdate(req.params.id, { name: req.body.name, slug: slugify(req.body.slug) }, { new: true });
            return res.status(200).send({ success: true, message: `${tag.name} updated successfully`, tag })
        } else {
            const tag = await tagModel.findByIdAndUpdate(req.params.id, { name: req.body.name, slug: slugify(req.body.name) }, { new: true });
            return res.status(200).send({ success: true, message: `${tag.name} updated successfully`, tag })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: `Error in updateTagCtrl api ${error.message}`, error })
    }
}

//getSingleTag Ctrl
const getSingleTagCtrl = async (req, res) => {
    try {
        const tag = await tagModel.findOne({ slug: req.params.slug });
        res.status(200).send({ success: true, message: 'Single Tag Fetched Successfully', tag })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `get single tag api issue : ${error}`, error })
    }
}

// deleteTagCtrl
const deleteTagCtrl = async (req, res) => {
    try {
        const tag = await tagModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ success: true, message: `${tag.name} deleted successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: `Error in deleteTagCtrl api ${error.message}`, error })
    }
}

//getAllTagsCtrl
const getAllTagsCtrl = async (req, res) => {
    try {
        const tags = await tagModel.find({});
        res.status(200).send({ success: true, message: 'All tags fetched successfully', tags });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: `Error in getAllTagsCtrl api ${error.message}`, error })
    }
}

module.exports = { createTagCtrl, updateTagCtrl, getSingleTagCtrl, deleteTagCtrl, getAllTagsCtrl };


