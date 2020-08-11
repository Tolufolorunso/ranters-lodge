const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');

// @desc        GET newsFeed page.
// @route       GET /newsfeed
// @access      Private
exports.getNewsFeed = catchAsync(async (req, res) => {
	const user = await User.findById({ _id: req.user.id });
	if (!user) {
		return next(new AppError('Please login to view the page', 401));
	}
	res.status(200).render('newsfeed', { user: req.user });
});
