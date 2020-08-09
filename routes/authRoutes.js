const express = require('express');
const { protect } = require('../middlewares/auth');

const router = express.Router();

const {
	getRegisterForm,
	postRegisterForm,
	getLoginForm,
	postLoginForm,
	getMe,
	forgotpassword,
	resetPassword
} = require('../controllers/authController');

router.route('/register').get(getRegisterForm).post(postRegisterForm);
router.route('/login').get(getLoginForm).post(postLoginForm);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotpassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
