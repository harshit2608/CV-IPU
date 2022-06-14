const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const User = require('../models/userModel');
const geocoder = require('../utils/geoCoder');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});

exports.addAddress = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    const user = await User.findById(req.user.id);
    if (user.verifiedEmail === false) {
        return next(new AppError('Please verify your Email ID.', 400));
    }

    user.address = req.body.address;
    const loc = await geocoder.geocode(req.body.address);
    // console.log(loc);
    user.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
    };
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        data: {
            user: user,
        },
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    const user = await User.findById(req.user.id);
    console.log(`THis is user ${user}`);
    if (user.verifiedEmail === false) {
        return next(new AppError('Please verify your Email ID.', 400));
    }

    console.log(req.body);
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(
        req.body,
        'name',
        'phoneNumber',
        'address',
        'profilePhoto'
    );

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );
    console.log(updatedUser);
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getUser = catchAsync(async (req, res, next) => {
    const query = await User.findById(req.params.id);

    if (!query) {
        console.log('DONEEEEEEE');
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: query,
        },
    });
});

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!',
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!',
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!',
    });
};
