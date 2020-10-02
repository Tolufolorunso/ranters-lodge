const express = require('express');
const router = express.Router();

const {
	getMe,
	getAllProfile,
	getUser,
	deleteUser,
	getMessage,
	updateProfile,
	updateAvatar,
	getAvatar
} = require('../controllers/profileController');
const { protect } = require('../middlewares/auth');
const { check } = require('express-validator');

router.get('/me', protect, getMe);
router.put(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('username', 'Username is required')
			.isLength({ min: 4 })
			.not()
			.isEmpty(),
		check('zip', 'Invalid Zip code').isLength({ min: 3 }).isNumeric()
	],
	protect,
	updateProfile
);
router.get('/', getAllProfile);
router.get('/user/:userId', getUser);
router.delete('/', protect, deleteUser);
router.get('/message', protect, getMessage);
router.get('/avatar', protect, getAvatar);

router.patch('/me/avatar', protect, updateAvatar);
// router.patch('/me/avatar', protect, updateAvatar);

module.exports = router;
