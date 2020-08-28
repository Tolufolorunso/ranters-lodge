const Post = require('../models/PostModels');
const catchAsync = require('../middlewares/catchAysnc');
const User = require('../models/UserModels');
const AppError = require('../utils/errorApp');
const { validationResult } = require('express-validator');

// @desc        Create a post.
// @route       POST /posts
// @access      Private
exports.createPost = catchAsync(async (req, res, next) => {
	// const post = await Post.findOneAndRemove({ _id: req.user.id });
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// To retrive all the errors for the array of errors
		const msg = errors.array().map(i => {
			return i.msg;
		});
		return res.status(422).json({
			status: 'fail',
			errorMessage: msg
		});
	}
	const user = await User.findById(req.user.id);
	const newPost = {
		text: req.body.text,
		name: user.name,
		avatar: user.avatar,
		user: req.user.id
	};

	const post = await Post.create(newPost);

	if (!post) {
		return next(new AppError('Server error', 500));
	}

	res.status(200).json({
		status: 'success',
		message: 'Post created',
		post
	});
});

// @desc        Get all posts.
// @route       GET /posts
// @access      Private
exports.getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find().sort({ date: -1 });
	console.log(posts);
	res.status(200).json({
		status: 'success',
		data: {
			posts
		}
	});
});

// @desc        Get a post.
// @route       GET /posts/:postId
// @access      Private
exports.getPost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.postId);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}
	res.status(200).json({
		status: 'success',
		post
	});
});

// @desc        Delete a post.
// @route       DELETE /posts/:postId
// @access      Private
exports.deletePost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.postId);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	if (post.user.toString() !== req.user.id) {
		return next(new AppError('User not authorized', 401));
	}

	await post.remove();

	res.status(200).json({
		status: 'success',
		message: 'Post deleted'
	});
});

// @desc        Like a post.
// @route       PUT /posts/like/:postId
// @access      Private
exports.likePost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.postId);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	// Check if post has already been liked by current user
	if (
		post.likes.filter(like => like.user.toString() === req.user.id).length > 0
	) {
		return next(new AppError('Post already liked', 400));
	}

	post.likes.unshift({ user: req.user.id });

	await post.save();

	res.status(200).json({
		status: 'success',
		message: post.likes
	});
});

// @desc        unlike a post.
// @route       PUT /posts/unlike/:postId
// @access      Private
exports.unLikePost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.postId);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	// Check if post has already been liked by current user
	if (
		post.likes.filter(like => like.user.toString() === req.user.id).length === 0
	) {
		return next(new AppError('Post has not been liked', 400));
	}

	const removeIndex = post.likes
		.map(like => like.user.toString())
		.indexOf(req.user.id);

	post.likes.splice(removeIndex, 1);

	await post.save();

	res.status(200).json({
		status: 'success',
		message: post.likes
	});
});

// @desc        Create a comment.
// @route       POST /posts/comment/:postId
// @access      Private
exports.postComment = catchAsync(async (req, res, next) => {
	// const post = await Post.findOneAndRemove({ _id: req.user.id });
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// To retrive all the errors for the array of errors
		const msg = errors.array().map(i => {
			return i.msg;
		});
		return res.status(422).json({
			status: 'fail',
			errorMessage: msg
		});
	}
	const user = await User.findById(req.user.id);
	const post = await Post.findById(req.params.postId);
	const newComment = {
		text: req.body.text,
		name: user.name,
		avatar: user.avatar,
		user: req.user.id
	};

	post.comments.unshift(newComment);

	await post.save();

	res.status(200).json({
		status: 'success',
		message: 'comment created',
		comments: post.comments
	});
});

// @desc        Delete a comment.
// @route       Delete /posts/comment/:postId/:commentId
// @access      Private
exports.deleteComment = catchAsync(async (req, res, next) => {
	// const post = await Post.findOneAndRemove({ _id: req.user.id });

	const post = await Post.findById(req.params.postId);
	// Get comment out
	const comment = post.comments.find(
		comment => comment.id === req.params.commentId
	);

	console.log(comment);
	// check if comment exist
	if (!comment) {
		return next(new AppError('Comment does not exist', 400));
	}

	// check if user permission to delete comment
	if (comment.user.toString() !== req.user.id) {
		return next(new AppError('User not authorized', 400));
	}

	const removeIndex = post.comments
		.map(comment => comment.user.toString())
		.indexOf(req.user.id);

	post.comments.splice(removeIndex, 1);

	await post.save();

	res.status(200).json({
		status: 'success',
		message: 'Comment deleted',
		comments: post.comments
	});
});
