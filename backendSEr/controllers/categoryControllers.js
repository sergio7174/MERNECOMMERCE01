const slugify = require("slugify");
const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

//createCategory Ctrl
const createCategoryCtrl = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ name: req.body.name });
        if (category) {
            return res.status(200).send({ success: false, message: 'Category already exist' })
        }
        if (req.body.slug) {
            let newCategory = new categoryModel({ name: req.body.name, slug: slugify(req.body.slug) });
            await newCategory.save();
            res.status(200).send({ success: true, message: 'Category created Successfully', newCategory })
        } else {
            let newCategory = new categoryModel({ name: req.body.name, slug: slugify(req.body.name) });
            await newCategory.save();
            res.status(200).send({ success: true, message: 'Category created Successfully', newCategory })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Create Category api issue : ${error}`, error })
    }
};

//updateCategory Ctrl
const updateCategoryCtrl = async (req, res) => {
    try {
        if (req.body.slug) {
            const category = await categoryModel.findByIdAndUpdate(req.params.id, { name: req.body.name, slug: slugify(req.body.slug) }, { new: true });
            res.status(200).send({ success: true, message: 'Category Updated Successfully', category });
        } else {
            const category = await categoryModel.findByIdAndUpdate(req.params.id, { name: req.body.name, slug: slugify(req.body.name) }, { new: true });
            res.status(200).send({ success: true, message: 'Category Updated Successfully', category });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `update category api issue : ${error}`, error })
    }
}

//getAllCategory Ctrl
const getCategoryCtrl = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({ success: true, message: 'All Categories fetched Successfully', category });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `get category api issue : ${error}`, error })
    }
}

//getSingleCategory Ctrl
const getSingleCategoryCtrl = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({ success: true, message: 'Single Category Fetched Successfully', category })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `get single category api issue : ${error}`, error })
    }
}

//deleteCategory Ctrl
const deleteCategoryCtrl = async (req, res) => {
    try {
        // const product = await productModel.find()
        // const prod = []
        // for (let i = 0; i < product.length; i++) {
        //     console.log(product[i].category)
        //     console.log(`new ObjectId("${req.params.id}")`)
        //     if (product[i].category == `new ObjectId("${req.params.id}")`) {
        //         product.splice(i, 1)
        //     }
        // }
        // // await product.save()
        const category = await categoryModel.findByIdAndDelete(req.params.id);

        res.status(200).send({ success: true, message: 'Category deleted successfully', category });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: `delete category api issue : ${error}`, error })
    }
}

module.exports = { createCategoryCtrl, updateCategoryCtrl, getCategoryCtrl, getSingleCategoryCtrl, deleteCategoryCtrl }
