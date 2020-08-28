const express = require('express');
const router = express.Router();

const { getChat } = require('../controllers/chatController');
const { protect } = require('../middlewares/auth');

router.post('/chat', protect, getChat);

module.exports = router;
