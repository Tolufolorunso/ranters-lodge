const catchAsync = require('../middlewares/catchAysnc');
const Message = require('../models/MessageModels');
const AppError = require('../utils/errorApp');

// @desc        Get Chat.
// @route       POST /users/chat
// @access      Private
exports.getChat = catchAsync(async (req, res) => {
	console.log([req.body.friendId, req.body.userId]);
	const chat = await Message.find({
		users: { $in: [req.body.friendId, req.body.userId] }
	})
		.populate('sender')
		.sort({ createdAt: -1 })
		.limit(20);

	if (!chat) {
		return next(new AppError('No chat history', 404));
	}

	res.status(200).json({
		status: 'success',
		chat
	});
});
