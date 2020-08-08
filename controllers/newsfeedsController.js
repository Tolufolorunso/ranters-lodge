// @desc        GET newsFeed page.
// @route       GET /newsfeed
// @access      Private
exports.getNewsFeed = (req, res) => {
	res.status(200).render('newsfeed', { user: '' });
};
