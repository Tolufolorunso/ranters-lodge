import React, { useState, useEffect } from 'react';
// import useToggle from '../shared/hooks/useToggle';

const ProfileForm = ({ userProfile, updateProfile }) => {
	const [profile, setProfile] = useState({
		name: userProfile.name,
		username: userProfile.username,
		zip: userProfile.zip,
		gender: userProfile.gender,
		bio: userProfile.bio
	});

	const [disabled, setDisabled] = useState({
		inputDisabled: true,
		cancelDisabled: false,
		editDisabled: true,
		submitDisabled: false
	});

	const { username, name, zip, gender, bio } = profile;

	useEffect(() => {
		// eslint-disable-next-line
	}, []);

	const handleChange = evt => {
		setProfile({ ...profile, [evt.target.name]: evt.target.value });
	};

	const onEdit = evt => {
		setDisabled({
			cancelDisabled: true,
			inputDisabled: false,
			editDisabled: false,
			submitDisabled: true
		});
	};
	const onCancel = () => {
		setDisabled({
			cancelDisabled: false,
			inputDisabled: true,
			editDisabled: true,
			submitDisabled: false
		});
	};
	const handleSubmit = evt => {
		evt.preventDefault();

		updateProfile(profile);
		console.log(profile);

		setDisabled({
			cancelDisabled: false,
			inputDisabled: true,
			editDisabled: true,
			submitDisabled: false
		});
	};

	return (
		<form className="form-tag" onSubmit={handleSubmit}>
			<div className="row">
				<div className="col m6 s12">
					<div className="input-field">
						<input
							type="text"
							disabled={disabled.inputDisabled}
							placeholder="Username"
							name="username"
							value={username || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="col m6 s12">
					<div className="input-field">
						<input
							type="text"
							disabled={disabled.inputDisabled}
							name="name"
							value={name || ''}
							placeholder="Name"
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col m6 s12">
					<div className="input-field">
						<input
							type="text"
							disabled={disabled.inputDisabled}
							name="zip"
							value={zip || ''}
							placeholder="Enter zip code"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="col m6 s12">
					<div className="input-field">
						<input
							type="text"
							disabled={disabled.inputDisabled || gender}
							placeholder="Gender"
							name="gender"
							value={gender || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col l12">
					<div className="input-field">
						<textarea
							name="bio"
							id="bio"
							value={bio || ''}
							onChange={handleChange}
							disabled={disabled.inputDisabled}
							placeholder="Bio"
							cols="50"
							rows="50"
						></textarea>
					</div>
				</div>
			</div>
			<input type="hidden" className="btn blue" id="user-id" />
			<div className="profile-edit-btns">
				<div className="input-field">
					<button
						type="submit"
						className="btn pink submitBtn"
						id="submitBtn"
						style={{ display: disabled.submitDisabled ? 'block' : 'none' }}
					>
						Update
					</button>
				</div>
				<div className="input-field">
					<input
						type="button"
						value="Edit"
						className="btn blue cancel"
						id="edit"
						onClick={onEdit}
						style={{ display: disabled.editDisabled ? 'block' : 'none' }}
					/>
					<input
						type="button"
						className="btn blue cancel"
						id="cancel"
						value="Cancel"
						style={{ display: disabled.cancelDisabled ? 'block' : 'none' }}
						onClick={onCancel}
					/>
				</div>
			</div>
		</form>
	);
};

export default ProfileForm;
