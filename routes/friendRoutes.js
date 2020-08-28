const express = require('express');
const router = express.Router();

const {
	searchUser,
	addFriend,
	acceptOrReject
} = require('../controllers/friendController');
const { protect } = require('../middlewares/auth');

router.get('/search/:username', protect, searchUser);
router.post('/addfriend', protect, addFriend);
router.post('/acceptorreject', protect, acceptOrReject);

module.exports = router;
