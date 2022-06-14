const slugify = require('slugify');
const shortid = require('shortid');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');

exports.createProduct = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.verifiedEmail === false) {
        return next(new AppError('Please verify your Email ID.', 400));
    }
    if (user.verifiedEmail === true) {
        console.log(`Email is verified`);
        console.log(req.user.id);
    }

    const { name, price, description, category, quantity, urlImg, createdBy } =
        req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => ({ img: file.location }));
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        urlImg,
        createdBy: req.user.id,
    });

    await product.save();
    console.log(`Product created`);

    return res.status(201).json({
        product,
        files: req.files,
    });
});

exports.getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products,
        },
    });
    // const products = await Product.find({ createdBy: req.user._id })
    //     .select(
    //         '_id name price quantity slug description productPictures category'
    //     )
    //     .populate({ path: 'category', select: '_id name' })
    //     .exec();

    // res.status(200).json({ products });
});

exports.getProductsBySlug = catchAsync(async (req, res, next) => {});

exports.getProductDetailsById = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    if (productId) {
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return next(
                new AppError(`No product found with id ${productId}`, 400)
            );
        }
        res.status(200).json({
            status: 'success',
            data: { product },
        });
    } else {
        return next(new AppError(`Params required`, 400));
    }
});

exports.deleteProductById = catchAsync(async (req, res, next) => {
    const { productId } = req.body.payload;
    if (productId) {
        Product.deleteOne({ _id: productId }).exec((error, result) => {
            if (error)
                return next(
                    new AppError(
                        `Unable to delete the product with id ${productId}`,
                        400
                    )
                );
            if (result) {
                res.status(202).json({ result });
            }
        });
    } else {
        return next(new AppError(`Params required`, 400));
    }
});
