const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');
const sharp = require('sharp');

// @desc        Get my detail(profile).
// @route       GET /users/me
// @access      private
exports.getMe = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user.id });
	if (!user) {
		return next(new AppError('No user found', 401));
	}
	res.status(200).render('profile', { user });
});

// @desc        Update user detail(profile).
// @route       PUT /users/me
// @access      private
exports.updateUser = catchAsync(async (req, res, next) => {
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
		return next(new AppError('The user doesnt exists', 404));
	}
	res.status(200).json({ status: 'success', user });
});

// @desc        Update user detail(profile).
// @route       PUT /users/me
// @access      private
exports.deleteUser = catchAsync(async (req, res, next) => {
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
		return next(new AppError('The user doesnt exists', 404));
	}
	res.status(200).json({ status: 'success', user });
});

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

// @desc        User Mssage page.
// @route       GET /users/message
// @access      private
exports.getMessage = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user.id });
	if (!user) {
		return next(new AppError('No user found', 401));
	}
	res.status(200).render('message', { friends: [], user });
});
