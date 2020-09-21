import React from 'react';
import profileImage from '../../images/mary.jpg';

const ProfileMe = props => {
	const { avatar, username } = props.userData;
	return (
		<div className="card center-align hoverable profile-card">
			<div className="card-image profile__card-image"></div>
			<div className="card-content profile__card-content">
				<img
					id="profile-pic"
					src={'http:' + avatar}
					alt="mary"
					className="broken-image circle responsive-img profile__img"
				/>
				<p>
					{username} <br />
					<span>quotes here</span>
				</p>
			</div>
			<div className="card-action profile__card-action">
				<input
					type="file"
					accept="image/*"
					id="avatar"
					className="change-avatar"
					name="avatar"
				/>
				<label htmlFor="avatar" className="btn blue">
					<i className="fa fa-upload"></i>Change Avatar
				</label>
			</div>
		</div>
	);
};

export default ProfileMe;
