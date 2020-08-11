const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');

// @desc        Get my detail(profile).
// @route       GET /users/me
// @access      private
exports.getMe = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user.id });
	console.log(user);
	if (!user) {
		return next(new AppError('No user found', 401));
	}
	console.log(user);
	res.status(200).render('profile', { user });
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
