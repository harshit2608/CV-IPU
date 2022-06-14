const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middlewares/middlewares');
const {
    validateVerifiedEmail,
    isRequestValidated,
    validateAddress,
} = require('../validators/authValidator');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', protect, userController.getMe, userController.getUser);
router.post('/address', protect, validateAddress, userController.addAddress);
router.post('/signout', authController.signout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/verifyEmail', authController.verifyEmail);
// router.post('/verifyPhone', authController.verifyPhone);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
    '/updateMyPassword',
    protect,
    // validateVerifiedEmail,
    isRequestValidated,
    authController.updatePassword
);
router.patch(
    '/updateMe',
    protect,
    // validateVerifiedEmail,
    isRequestValidated,
    userController.updateMe
);
router.delete('/deleteMe', protect, userController.deleteMe);

router
    .route('/')
    .get(/*protect, restrictTo('admin'),*/ userController.getAllUsers)
    .post(protect, restrictTo('admin'), userController.createUser);

router
    .route('/:id')
    .get(/*protect, restrictTo('admin'),*/ userController.getUser)
    .patch(protect, restrictTo('admin'), userController.updateUser)
    .delete(protect, restrictTo('admin'), userController.deleteUser);

module.exports = router;
