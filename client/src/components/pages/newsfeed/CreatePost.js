import React from 'react';
import userImage from '../../../images/mary.jpg';

const CreatePost = () => {
	return (
		<div className="createPost mb-m">
			<form className="createPost__form">
				<div className="row">
					<div className="col s7">
						<div className="createPost__text-image">
							<img
								src={userImage}
								alt="tolu"
								className="broken-image circle responsive-img"
							/>
							<textarea
								name="body"
								id="rant-message"
								className="rant-message"
								cols="30"
								rows="10"
								placeholder="Rant as you like"
							></textarea>
						</div>
					</div>
					<div className="col s1">
						{
							// 	<div className="createPost__tools">
							// 	<label htmlFor="file-input">
							// 		<i className="material-icons">camera_alt</i>
							// 	</label>
							// 	<input type="file" id="file-input" name="post_image" />
							// </div>
						}
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
