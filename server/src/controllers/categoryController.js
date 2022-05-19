const slugify = require('slugify');
const shortid = require('shortid');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Category = require('../models/categoryModel');

const createCategories = function (categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId === undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (const cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id),
        });
    }

    return categoryList;
};

exports.addCategory = catchAsync(async (req, res, next) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        createdBy: req.user._id,
    };

    if (req.file) {
        categoryObj.categoryImage = '/public/' + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    await cat.save((error, category) => {
        // if (error) {
        //     // return res.status(400).json({ error });
        //     return next(new AppError(`${error}`, 400));
        // }
        // if (category) {
        //     return res.status(201).json({ category });
        // }
    });
    return res.status(201).json({ cat });
});

exports.getCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    const categoryList = createCategories(categories);
    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: categoryList.length,
        data: {
            categoryList,
        },
    });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i],
            };
            if (parentId[i] !== '') {
                category.parentId = parentId[i];
            }

            const updatedCategory = await Category.findOneAndUpdate(
                { _id: _id[i] },
                category,
                { new: true }
            );
            updatedCategories.push(updatedCategory);
        }
    } else {
        const category = {
            name,
            type,
        };
        if (parentId !== '') {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate(
            { _id },
            category,
            {
                new: true,
            }
        );
        return res.status(201).json({ updatedCategory });
    }
    return res.status(201).json({ updateCategories: updatedCategories });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({
            _id: ids[i]._id,
            createdBy: req.user._id,
        });
        deletedCategories.push(deleteCategory);
    }

    if (deletedCategories.length === ids.length) {
        res.status(201).json({ message: 'Categories removed' });
    } else {
        return next(new AppError(`Something went wrong!!`, 400));
    }
});
