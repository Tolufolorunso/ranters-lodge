const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
	getMe,
	getMessage,
	updateUser,
	updateAvatar,
	getAvatar
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.get('/me', protect, getMe);
router.put('/me', protect, updateUser);
router.get('/message', protect, getMessage);
router.get('/:id/avatar', getAvatar);

//Upload profile avatar
const upload = multer({
	limits: {
		fileSize: 1000000
	},

	fileFilter(req, file, cb) {
		if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
			return cb(new Error('Please upload an image'));
		}
		cb(undefined, true);
	}
});

const multerError = (error, req, res, next) => {
	res.status(400).json({
		status: 'fail',
		message: error.message
	});
};

router.patch(
	'/me/avatar',
	protect,
	upload.single('avatar'),
	updateAvatar,
	multerError
);

module.exports = router;
