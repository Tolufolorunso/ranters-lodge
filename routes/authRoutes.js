const express = require('express');

const router = express.Router();

const {
	postRegisterForm,
	postLoginForm,
	getMe,
	forgotpassword,
	resetPassword
} = require('../controllers/authController');

router.post('/register', postRegisterForm);
router.post('/login', postLoginForm);
router.post('/forgotpassword', forgotpassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
