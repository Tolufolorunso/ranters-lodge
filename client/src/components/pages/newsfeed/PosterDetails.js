import React from 'react';

const PosterDetails = ({ post, likeAPost, unLikeAPost, userProfile }) => {
	// const likeStyle = {
	// 	background: '#ec407a !important'
	// };
	// const notLikeStyle = {
	// 	background: '#2196F3 !important'
	// };

	return (
		<div className="post-detail__user-info">
			<h5>
				<a href="timeline.html" className="profile-link">
					{post.name}
				</a>
				<span className="following">following</span>
			</h5>
			<p className="text-muted">Published a photo about 3 mins ago</p>
			<div className="reaction">
				<span
					className="badge white-text blue hoverable unlike"
					onClick={() => unLikeAPost(post._id)}
				>
					<i className="material-icons">thumb_down </i>
					{post.unlikes.length === 0 ? '' : ` ${post.unlikes.length}`}
				</span>
				<span
					className="badge white-text blue hoverable like"
					onClick={() => likeAPost(post._id)}
				>
					<i className="material-icons">thumb_up </i>
					{post.likes.length === 0 ? '' : ` ${post.likes.length}`}
				</span>
			</div>
		</div>
	);
};

export default PosterDetails;
