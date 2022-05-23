const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const geocoder = require('../utils/geoCoder');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name!'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please provide your phone number'],
            unique: true,
            // validate: [
            //     validator.isMobilePhone,
            //     'Please provide a valid mobile number',
            // ],
        },
        address: String,
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
            formattedAddress: String,
        },
        profilePhoto: String,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (ele) {
                    return ele === this.password;
                },
                message: 'Passwords are not the same!',
            },
        },
        verifiedEmail: { type: Boolean, default: false },
        verifiedPhone: { type: Boolean, default: false },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        phoneOTP: String,
        // verificationEmailToken: String,
        // verificationEmailExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

// userSchema.methods.createVerificationToken = function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     this.verificationEmailToken = crypto
//         .createHash('sha256')
//         .update(resetToken)
//         .digest('hex');

//     console.log({ resetToken }, this.verificationEmailToken);

//     this.verificationEmailExpires = Date.now() + 10 * 60 * 1000;

//     return resetToken;
// };

userSchema.methods.configAddress = async function (next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
    };

    // this.address = undefined;
    // next();
};

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
