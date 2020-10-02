import React from 'react';
import './postImage.css';

const PostImage = ({ postImage, postPoster }) => {
	return (
		<div className="postContent-img">
			<img
				src={`http:${postImage}`}
				alt={`Post of ${postPoster}`}
				className="responsive-img post-image"
			/>
		</div>
	);
};

export default PostImage;
