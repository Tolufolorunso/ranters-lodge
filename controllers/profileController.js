const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');
const sharp = require('sharp');
const { validationResult } = require('express-validator');

// @desc        Get my detail(profile).
// @route       GET /profile/me
// @access      private
exports.getMe = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user.id });
	if (!user) {
		return next(new AppError('No user found', 401));
	}
	res.status(200).json({
		status: 'success',
		data: {
			user
		}
	});
});

// @desc        Get all profile.
// @route       GET /profile
// @access      Public
exports.getAllProfile = catchAsync(async (req, res, next) => {
	const users = await User.find({}).select('name avatar bio username');
	if (!users) {
		return next(new AppError('Server error', 500));
	}
	res.status(200).json({
		status: 'success',
		data: {
			users
		}
	});
});

// @desc        Get user profile by user id.
// @route       GET /profile/user/:userId
// @access      Public
exports.getUser = catchAsync(async (req, res, next) => {
	const profile = await User.findOne({ _id: req.params.userId }).select(
		'name avatar bio username'
	);
	if (!profile) {
		return next(new AppError('There is no profile found', 400));
	}
	res.status(200).json({
		status: 'success',
		data: {
			profile
		}
	});
});

// @desc        Get user profile by user id.
// @route       GET /profile/user/:userId
// @access      Public
exports.deleteUser = catchAsync(async (req, res, next) => {
	// To remove user post

	// To remove user profile
	await User.findOneAndRemove({ _id: req.user.id });
	res.status(200).json({
		status: 'success',
		message: 'User deleted'
	});
});

// @desc        Update user detail(profile).
// @route       PUT /profile
// @access      private
exports.updateProfile = catchAsync(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		// To retrive all the errors for the array of errors
		const msg = errors.array().map(i => {
			return i.msg;
		});
		return res.status(422).json({
			status: 'fail',
			errorMessage: msg
		});
	}
	if (req.body.username !== req.user.username) {
		const usernameExists = await User.findOne({ username: req.body.username });
		if (usernameExists) {
			return next(new AppError('Username is already exists', 400));
		}
	}
	const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
		new: true
	});
	if (!user) {
		return next(new AppError('Something went wrong', 500));
	}
	res.status(200).json({ status: 'success', user });
});

// // @desc        Update user detail(profile).
// // @route       PUT /users/me
// // @access      private
// exports.deleteUser = catchAsync(async (req, res, next) => {
// 	if (req.body.username !== req.user.username) {
// 		const usernameExists = await User.findOne({ username: req.body.username });
// 		if (usernameExists) {
// 			return next(new AppError('Username is already exists', 400));
// 		}
// 	}
// 	const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
// 		new: true
// 	});
// 	if (!user) {
// 		return next(new AppError('The user doesnt exists', 404));
// 	}
// 	res.status(200).json({ status: 'success', user });
// });

// @desc        Change user avatar(profile).
// @route       PATCH /users/me/avatar
// @access      private
exports.updateAvatar = catchAsync(async (req, res) => {
	const buffer = await sharp(req.file.buffer).resize(150, 200).png().toBuffer();
	await User.findByIdAndUpdate(req.user.id, {
		avatar: buffer
	});
	const user = await User.findById(req.user._id);
	res.send(user);
});

// @desc        Update user profile avatar
// @route       GET users/:Id/avatar
// @access      Private
exports.getAvatar = catchAsync(async (req, res) => {
	const user = await User.findById(req.params.id);
	res.set('Content-Type', 'image/png');
	res.send(user.avatar);
});

// @desc        User Message page.
// @route       GET /users/message
// @access      private
exports.getMessage = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user.id });
	if (!user) {
		return next(new AppError('No user found', 401));
	}
	res.status(200).render('message', { friends: user.friendsList, user });
});
