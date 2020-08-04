const express = require('express');
const router = express.Router();

const { getNewsFeed } = require('../controllers/newsfeedsController');

router.get('/', getNewsFeed);

module.exports = router;
