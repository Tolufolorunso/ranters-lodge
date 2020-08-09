// @desc        GET newsFeed page.
// @route       GET /newsfeed
// @access      Private
exports.getNewsFeed = (req, res) => {
	console.log(req.user);
	res.status(200).render('newsfeed', { user: '' });
};
