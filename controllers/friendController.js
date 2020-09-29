const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');

// @desc        Search user.
// @route       POST users/search/:username
// @access      private
exports.searchUser = catchAsync(async (req, res) => {
	const searchedUser = await User.findOne({ username: req.params.username });

	// If user not Found, it will return empty array
	if (!searchedUser) {
		return res.status(204).json({
			data: []
		});
	}

	// If user searches for its own username. it will return nothing
	if (req.user.username === searchedUser.username) {
		// const  = await User.findOne({ username: req.params.username });
		return res.status(200).render('search', {
			user: '',
			type: '',
			query: ''
		});
	}

	const sender = await User.findOne({
		username: req.user.username
	});

	const { friendsList, sentRequest, request } = sender;
	const sR = sentRequest.find(i => i.username === searchedUser.username);
	const findInRequest = request.find(i => i.username === searchedUser.username);
	const friend = friendsList.find(i => i.username === searchedUser.username);

	if (sR) {
		return res.status(200).render('search', {
			user: searchedUser,
			type: 'pending',
			query: req.params.username
		});
	}
	if (findInRequest) {
		return res.status(200).render('search', {
			user: searchedUser,
			type: 'accept',
			query: req.params.username
		});
	}
	if (friend) {
		return res.status(200).render('search', {
			user: searchedUser,
			type: 'friend',
			query: req.params.username
		});
	}

	res.status(200).render('search', {
		user: searchedUser,
		type: 'notfriend',
		query: req.params.username
	});
});

// @desc        Search user.
// @route       POST users/addFriend
// @access      private
exports.addFriend = catchAsync(async (req, res) => {
	const { username, userId } = req.body;
	console.log(req.body);

	console.log(req.user._id);
	await User.findByIdAndUpdate(req.user._id, {
		$inc: { totalRequest: 1 },
		$push: {
			sentRequest: {
				username: username
			}
		}
	});
	await User.findByIdAndUpdate(userId, {
		$push: {
			request: {
				userId: req.user._id,
				username: req.user.username
			}
		}
	}).exec(function (e, data) {
		res.status(200).json({
			status: 'success',
			message: 'Request sent'
		});
	});
});

// @desc        Either reject or accept request.
// @route       POST /users/acceptorreject
// @access      private
exports.acceptOrReject = catchAsync(async (req, res) => {
	const { username, name, acceptOrReject, id } = req.body;
	if (acceptOrReject === 'accept') {
		await User.findByIdAndUpdate(req.user._id, {
			$inc: { totalRequest: -1 },
			$push: {
				friendsList: {
					friendId: id,
					username,
					name
				}
			}
		});
		await User.findByIdAndUpdate(id, {
			$push: {
				friendsList: {
					friendId: req.user._id,
					username: req.user.username,
					name: req.user.name
				}
			}
		});
		await User.findByIdAndUpdate(id, {
			$pull: {
				sentRequest: {
					username: req.user.username
				}
			}
		});
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				request: {
					userId: id,
					username
				}
			}
		});
	}
	if (acceptOrReject === 'reject') {
		console.log(username, acceptOrReject, id);
	}
});
