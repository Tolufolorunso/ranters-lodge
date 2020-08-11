const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const sendEmail = require('../utils/sendMail');

const { check } = require('express-validator');

// @desc        Get register form.
// @route       GET /auth/register
// @access      public
exports.getRegisterForm = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		return res.redirect('/ranter/newsfeed');
	}
	res.status(200).render('auth/register', { errorsValidation: [] });
});

// @desc        Get Login form.
// @route       GET /auth/login
// @access      public
exports.getLoginForm = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		return res.redirect('/ranter/newsfeed');
	}
	res.status(200).render('auth/login', {
		errorsValidation: [],
		message: req.flash('info')
	});
});

// @desc        Post register form.
// @route       Post /auth/register
// @access      public
exports.postRegisterForm = catchAsync(async (req, res, next) => {
	const {
		name,
		username,
		password,
		passwordConfirm,
		gender,
		zip,
		email
	} = req.body;

	const user = await User.create({
		name,
		username,
		password,
		gender,
		zip,
		email
	});

	// create token
	// const token = user.getSignedJWTToken();

	req.flash('info', `Registration is successful ${username}`);
	req.flash('email', email);
	res.status(201).json({
		status: 'success',
		user
	});
});

// @desc        Post Login form.
// @route       Post /auth/login
// @access      public
exports.postLoginForm = catchAsync(async (req, res, next) => {
	const { password, email } = req.body;

	console.log(password, email);

	// validate user: email and password
	if (!email || !password) {
		return next(new AppError('Please provide an email and password', 400));
	}

	//Check for user in the database
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return next(new AppError('Invalid credentials', 401));
	}

	//Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new AppError('Invalid credentials', 401));
	}

	//create token
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt', token, cookieOptions).status(200).json({
		status: 'success',
		user,
		token
	});
});

// @desc        Forgot password.
// @route       POST /auth/forgotpassword
// @access      public
exports.forgotpassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError('No user found', 404));
	}

	//Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({
		validateBeforeSave: false
	});

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/auth/resetpassword/${resetToken}`;

	const message = `Reset your password : \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message
		});
		res.status(200).json({ status: 'success', data: 'Email sent' });
	} catch (error) {
		console.log(error);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });

		return next(new AppError('Email could not be sent', 500));
	}

	res.status(200).json({
		status: 'fail',
		data: {
			user
		}
	});
});

// @desc        Reset password.
// @route       Put /auth/resetpassword/:resettoken
// @access      public
exports.resetPassword = catchAsync(async (req, res, next) => {
	//Get hashed token

	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});

	if (!user) {
		return next(new AppError('Invalid token', 400));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save({
		validateBeforeSave: false
	});
	res.status(200).json({
		status: 'success',
		data: 'Login with the new password'
	});
});
