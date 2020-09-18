import React from 'react';
import postImage from '../../../images/mary.jpg';

const GetComments = () => {
	return (
		<div className="post-detail__post-comment mb-s">
			<div className="postContent__img">
				<img
					src={postImage}
					alt=""
					className="broken-image circle responsive-img"
				/>
			</div>

			<p>
				<a href="timeline.html" className="profile-link">
					John
				</a>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud
			</p>
		</div>
	);
};

export default GetComments;
