const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const User = require('../models/userModel');
const { createSendToken } = require('../middlewares/middlewares');
const Email = require('../utils/email');

exports.verifyEmail = catchAsync(async (req, res, next) => {
    const { token } = req.query;
    // console.log(`Logging from authController Verification with token ${token}`);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return next(
                    new AppError('Token is invalid or has expired', 400)
                );
            }

            const { name, email, password } = decodedToken;
            const user = await User.findOne({ email });
            if (!user) {
                return next(
                    new AppError(`No User found with email id ${email}`, 400)
                );
            }

            user.verifiedEmail = true;
            await user.save({ validateBeforeSave: false });
            // res.status(200).json({
            //     status: 'success',
            //     data: {
            //         user,
            //     },
            // });
            res.render(`${__dirname}/../views/email/emailVerified.pug`);
            await new Email(user).sendEmailVerified();
        });
    } else {
        return next(new AppError(`Something went Wrong`, 500));
    }
});

exports.verifyPhone = catchAsync(async (req, res, next) => {});

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        phoneNumber: req.body.phoneNumber,
    });

    if (newUser.role !== 'user') {
        return next(new AppError('Invalid Role!', 400));
    }

    const { name, email, password } = req.body;
    // const verificationToken = newUser.createVerificationToken();
    // await newUser.save({ validateBeforeSave: false });

    const verificationToken = jwt.sign(
        { name, email, password },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
    );

    const verificationURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/verifyEmail?emailVeriToken=${verificationToken}`;

    await new Email(newUser, verificationURL).sendVerifyEmail();

    createSendToken(newUser, 201, res);

    const url = `${req.protocol}://${req.get('host')}/api/v1/users/me`;
    await new Email(newUser, url).sendWelcome();
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.signout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
        message: 'Signout successfully...!',
    });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    try {
        await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError(
                'There was an error sending the email. Try again later!'
            ),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');
    if (user.verifiedEmail === false) {
        return next(new AppError('Please verify your Email ID.', 400));
    }

    // 2) Check if POSTed current password is correct
    console.log(req.body);
    if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
        return next(new AppError('Your current password is wrong.', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});
