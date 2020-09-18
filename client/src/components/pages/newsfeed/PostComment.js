import React from 'react';
import postImage from '../../../images/mary.jpg';

const PostComment = () => {
	return (
		<div className="post-detail__post-form mb-m">
			<img
				src={postImage}
				alt=""
				className="broken-image circle responsive-img"
			/>
			<input
				type="text"
				className="comment-form"
				placeholder="Post a comment"
			/>
		</div>
	);
};

export default PostComment;
