import React, { useState } from 'react';
import postImage from '../../../images/mary.jpg';

const PostComment = ({ userProfile, name, addComment, post }) => {
	const [comment, setComment] = useState('');

	const handleChange = evt => {
		setComment(evt.target.value);
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		if (comment === '') {
			console.log('enter comment');
			return false;
		}

		addComment(post._id, {
			text: comment,
			name: userProfile.name,
			avatar: userProfile.avatar,
			user: userProfile._id
		});

		setComment('');
	};

	const serverAvater = (
		<img
			src={`https:${userProfile.avatar[0]}`}
			alt={`Profile of ${name}`}
			className="broken-image circle responsive-img"
		/>
	);
	const defaultAvatar = (
		<img
			src={postImage}
			alt={`Profile of ${name}`}
			className="broken-image circle responsive-img"
		/>
	);
	return (
		<div className="post-detail__post-form mb-m">
			{typeof serverAvater !== 'undefined' ? serverAvater : defaultAvatar}
			<form
				onSubmit={handleSubmit}
				style={{ width: '100%', paddingRight: '20px' }}
			>
				<input
					type="text"
					className="comment-form"
					placeholder="Post a comment"
					onChange={handleChange}
					value={comment}
				/>
			</form>
		</div>
	);
};

export default PostComment;
