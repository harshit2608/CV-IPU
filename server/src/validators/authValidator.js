const { check, validationResult, body } = require('express-validator');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// exports.validateVerifiedEmail = catchAsync(async (req, res, next) => {
//     const user = User.findById(req.id);
//     if (user.verifiedEmail !== false) {
//         return next(new AppError(`Please verify your email`, 400));
//         console.log(user.verifiedEmail);
//     } else {
//         next();
//     }
// });

exports.validateVerifiedEmail = [
    body('name').isEmail().withMessage('Valid Email is required'),
    // body('verifiedEmail').custom((val, { req }) => {
    //     if (req.body.verifiedEmail === false) {
    //         // return next(new AppError(`Please verify your email`, 400));
    //         throw new Error('Password confirmation does not match password');
    //     }
    //     return true;
    // }),
    // .contains(false)
    // .withMessage('Please verify your email'),
];

exports.validateAddress = [
    body('street', 'Street cannot be empty').trim().not().isEmpty(),
    body('locality', 'Locality cannot be empty').trim().not().isEmpty(),
    body('aptName', 'Apartment name cannot be empty').trim().not().isEmpty(),
    body('zip', 'Zipcode cannot be empty').trim().not().isEmpty(),
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
