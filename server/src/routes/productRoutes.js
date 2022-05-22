const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const productController = require('../controllers/productController');

const { protect, restrictTo } = require('../middlewares/middlewares');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

router.post(
    '/create',
    protect,
    upload.array('productPicture'),
    productController.createProduct
);

router.get('/:slug', productController.getProductsBySlug);

router.get('/:productId', productController.getProductDetailsById);

router.delete(
    '/deleteProductById',
    protect,
    productController.deleteProductById
);

router.post(
    '/getProducts',
    // protect,
    // restrictTo('admin'),
    productController.getProducts
);

module.exports = router;
