const express = require('express');
const router = express.Router();

const { getNewsFeed } = require('../controllers/newsfeedsController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getNewsFeed);

module.exports = router;
