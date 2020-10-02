import React from 'react';

const PostText = ({ post }) => {
	return (
		<div className="post-detail__post-text">
			<p>
				{post.text}
				<a href="#!">more...</a>
			</p>
		</div>
	);
};

export default PostText;
