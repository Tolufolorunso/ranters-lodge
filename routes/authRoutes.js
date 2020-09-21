const express = require('express');
const { body, check } = require('express-validator');
const User = require('../models/UserModels');
const { protect } = require('../middlewares/auth');

const router = express.Router();

const {
	postRegisterForm,
	postLoginForm,
	getMe,
	forgotpassword,
	resetPassword,
	getLoggedInUser
} = require('../controllers/authController');

router.get('/', protect, getLoggedInUser);

router.post(
	'/register',
	[
		check('email')
			.isEmail()
			.withMessage('please enter a valid email.')
			.custom((value, { req }) => {
				// Check if user exists in the database
				return User.findOne({ email: value }).then(user => {
					if (user) {
						return Promise.reject('Email already in use');
					}
				});
			}),
		body('username', 'Username is in valid').isLength({ min: 4 }),
		body('name', 'Name is required').isLength({ min: 4 }),
		body('password', 'Please enter valid password')
			.isLength({ min: 3 })
			.isAlphanumeric(),
		body('passwordConfirm').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords have to match');
			}
			return true;
		})
	],
	postRegisterForm
);
router.post(
	'/login',
	[
		check('email')
			.isEmail()
			.withMessage('please enter a valid email.')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then(user => {
					if (!user) {
						return Promise.reject('Password or email is incorrect.');
					}
				});
			}),
		body('password', 'Password or email is incorrect')
			.isLength({ min: 3 })
			.isAlphanumeric()
	],
	postLoginForm
);
router.post(
	'/forgotpassword',
	check('email')
		.isEmail()
		.withMessage('please enter a valid email.')
		.custom((value, { req }) => {
			return User.findOne({ email: value }).then(user => {
				if (!user) {
					return Promise.reject('Email is not found');
				}
			});
		}),
	forgotpassword
);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
