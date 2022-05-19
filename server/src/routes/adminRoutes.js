const express = require('express');

const authController = require('../controllers/admin/authController');
// const { protect } = require('../controllers/authController');
const { protect } = require('../middlewares/middlewares');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/signout', authController.signout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', protect, authController.updatePassword);
// router.patch('/updateMe', authController.protect, userController.updateMe);

module.exports = router;
