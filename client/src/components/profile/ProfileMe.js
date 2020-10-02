import React from 'react';
import Spinner from '../layout/spinner/Spinner';

const ProfileMe = props => {
	const { avatar, upload, loading, userName } = props;
	console.log(avatar);

	const onUpload = async evt => {
		upload(evt.target.files[0], avatar[1]);
	};

	return (
		<div className="card center-align hoverable profile-card">
			<div className="card-image profile__card-image"></div>
			<div className="card-content profile__card-content">
				{loading ? (
					<Spinner />
				) : (
					<img
						id="profile-pic"
						src={`https:${avatar[0]}`}
						alt="mary"
						className="broken-image circle responsive-img profile__img"
					/>
				)}

				<p>
					{userName} <br />
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
					onChange={onUpload}
				/>
				<label htmlFor="avatar" className="btn blue">
					<i className="fa fa-upload"></i>Change Avatar
				</label>
			</div>
		</div>
	);
};

export default ProfileMe;
