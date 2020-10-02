import React from 'react';

const PosterImage = ({ postAvatar, name }) => {
	return (
		<div className="postContent__img">
			<img
				src={`https:${postAvatar[0]}`}
				alt={`Profile of ${name}`}
				className="broken-image circle responsive-img post-img"
			/>
		</div>
	);
};

export default PosterImage;
