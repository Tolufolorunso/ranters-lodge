import React, { useState } from 'react';
import userImage from '../../../images/mary.jpg';
import './createPost.css';

const CreatePost = ({ userProfile, name, addPost }) => {
	const [text, setText] = useState('');
	const [file, setFile] = useState(null);
	// let refText = useRef('');
	// let refImage = useRef(null);

	const handleSubmitPost = evt => {
		evt.preventDefault();
		if (text === '') {
			return;
		}
		const postData = {
			text: text,
			user: userProfile._id,
			name: name,
			avatar: userProfile.avatar
		};

		addPost(postData, file);
		setText('');
		setFile(null);
	};

	return (
		<div className="createPost mb-m">
			<form className="createPost__form" onSubmit={handleSubmitPost}>
				<div className="row">
					<div className="col s7">
						<div className="createPost__text-image">
							<img
								src={`http:${userProfile.avatar[0]}` || userImage}
								alt={`Profile of ${name}`}
								className="broken-image circle responsive-img"
							/>
							<textarea
								name="body"
								className="createPost__textarea"
								cols="30"
								rows="10"
								placeholder="Rant as you like"
								value={text}
								onChange={evt => setText(evt.target.value)}
							></textarea>
						</div>
					</div>
					<div className="col s1">
						<div className="createPost__tools"></div>
						<label htmlFor="avatar">
							<i className="material-icons">camera_alt</i>
						</label>
						<input
							type="file"
							accept="image/*"
							id="avatar"
							className="change-avatar"
							name="avatar"
							onChange={evt => setFile(evt.target.files[0])}
						/>
					</div>
					<div className="col s2">
						<div className="btn-publish input-field">
							<button type="submit" className="btn btn-publish-btn pink">
								Publish
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreatePost;
