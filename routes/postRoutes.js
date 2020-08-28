const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { check } = require('express-validator');

const {
	createPost,
	getAllPosts,
	getPost,
	deletePost,
	likePost,
	unLikePost,
	postComment,
	deleteComment
} = require('../controllers/postController');

router.post(
	'/',
	[check('text', 'Post is required').not().isEmpty()],
	protect,
	createPost
);
router.post(
	'/comment/:postId',
	[check('text', 'Post is required').not().isEmpty()],
	protect,
	postComment
);

router.get('/', protect, getAllPosts);
router.get('/:postId', protect, getPost);
router.delete('/:postId', protect, deletePost);
router.delete('/comment/:postId/:commentId', protect, deleteComment);
router.put('/like/:postId', protect, likePost);
router.put('/unlike/:postId', protect, unLikePost);

module.exports = router;
