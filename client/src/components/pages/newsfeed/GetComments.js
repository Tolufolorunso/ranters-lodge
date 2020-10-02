import React from 'react';
import postImage from '../../../images/mary.jpg';

const GetComments = ({ post }) => {
	const comment =
		post.comments.length > 0
			? post.comments[0]
			: { avatar: postImage, text: 'Be the first to comment', name: '' };
	return (
		<div className="post-detail__post-comment mb-s">
			<div className="postContent__img">
				<img
					src={`http:${comment.avatar}`}
					alt=""
					className="broken-image circle responsive-img"
				/>
			</div>

			<p>
				<a href="timeline.html" className="profile-link">
					{comment.name} - {''}
				</a>
				{comment.text}
			</p>
		</div>
	);
};

export default GetComments;
