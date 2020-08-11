const express = require('express');
const router = express.Router();

const { getMe, getMessage } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.get('/me', protect, getMe);
router.get('/message', protect, getMessage);

module.exports = router;
