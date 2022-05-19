const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const categoryController = require('../controllers/categoryController');

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
    restrictTo('admin'),
    upload.single('categoryImage'),
    categoryController.addCategory
);

router.get('/getCategories', categoryController.getCategories);

router.post(
    '/update',
    protect,
    restrictTo('admin'),
    upload.array('categoryImage'),
    categoryController.updateCategory
);

router.delete(
    '/delete',
    protect,
    restrictTo('admin'),
    categoryController.deleteCategory
);

module.exports = router;
