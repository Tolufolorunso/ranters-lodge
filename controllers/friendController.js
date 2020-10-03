const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');

// @desc        Search user.
// @route       GET users/search/:username
// @access      private
exports.searchUser = catchAsync(async (req, res) => {
	const username = req.params.username.toLowerCase();

	// If user searches for its own username. it will return nothing
	if (req.user.username === username) {
		return res.status(200).json({
			user: '',
			type: '',
			query: ''
		});
	}

	const searchedUser = await User.findOne({ username });

	// If user not Found, it will return empty array
	if (!searchedUser) {
		console.log('not found');
		return res.status(200).json({
			id: '',
			type: 'notfound',
			query: '',
			avatar: ''
		});
	}

	const sender = await User.findOne({
		username: req.user.username
	});

	const { friendsList, sentRequest, request } = sender;
	const requestSent = sentRequest.find(
		i => i.username === searchedUser.username
	);
	const findInRequest = request.find(i => i.username === searchedUser.username);
	const friend = friendsList.find(i => i.username === searchedUser.username);

	if (requestSent) {
		return res.status(200).json({
			name: searchedUser.name,
			avatar: searchedUser.avatar,
			id: searchedUser.id,
			username: searchedUser.username,
			type: 'Pending',
			query: req.params.username
		});
	}
	if (findInRequest) {
		return res.status(200).json({
			name: searchedUser.name,
			avatar: searchedUser.avatar,
			id: searchedUser.id,
			username: searchedUser.username,
			type: 'Accept',
			query: req.params.username
		});
	}
	if (friend) {
		return res.status(200).json({
			name: searchedUser.name,
			avatar: searchedUser.avatar,
			id: searchedUser.id,
			username: searchedUser.username,
			type: 'Friend',
			query: req.params.username
		});
	}

	res.status(200).json({
		name: searchedUser.name,
		avatar: searchedUser.avatar,
		id: searchedUser.id,
		username: searchedUser.username,
		type: 'Add',
		query: req.params.username
	});
});

// @desc        Search user.
// @route       POST users/addFriend
// @access      private
exports.addFriend = catchAsync(async (req, res) => {
	const { username, userId } = req.body;
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
			name: data.name,
			avatar: data.avatar,
			id: data.id,
			username: data.username,
			type: 'Pending',
			query: data.username
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
		const searchedUser = await User.findByIdAndUpdate(id, {
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
		return res.status(200).json({
			name: searchedUser.name,
			avatar: searchedUser.avatar,
			id: searchedUser.id,
			username: searchedUser.username,
			type: 'Friend',
			query: req.params.username
		});
	}

	if (acceptOrReject === 'reject') {
		const searchedUser = await User.findByIdAndUpdate(id, {
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
		return res.status(200).json({
			name: searchedUser.name,
			avatar: searchedUser.avatar,
			id: searchedUser.id,
			username: searchedUser.username,
			type: 'Add',
			query: req.params.username
		});
	}
});
