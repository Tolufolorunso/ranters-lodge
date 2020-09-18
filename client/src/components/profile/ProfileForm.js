import React, { useState } from 'react';

const ProfileForm = () => {
	const [formData, setFormData] = useState({
		firstname: '',
		username: '',
		zip: '',
		gender: '',
		bio: ''
	});

	const { username, firstname, zip, gender, bio } = formData;

	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};
	const handleSubmit = evt => {
		evt.preventDefault();

		console.log(formData);
	};
	return (
		<form className="form-tag" onClick={handleSubmit}>
			<div className="row">
				<div className="col m6 s12">
					<div className="input-field">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							disabled=""
							name="username"
							value={username}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="col m6 s12">
					<div className="input-field">
						<label htmlFor="firstname">Firstname</label>
						<input
							type="text"
							disabled=""
							name="firstname"
							value={firstname}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col m6 s12">
					<div className="input-field">
						<label htmlFor="zip">Zip</label>
						<input
							type="text"
							disabled=""
							name="zip"
							value={zip}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="col m6 s12">
					<div className="input-field">
						<label htmlFor="gender">Gender</label>
						<input
							type="text"
							disabled=""
							name="gender"
							value={gender}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col l12">
					<div className="input-field">
						<label htmlFor="bio">Bio</label>
						<textarea
							name="Tolulope"
							id="bio"
							value={bio}
							onChange={handleChange}
							disabled=""
							cols="50"
							rows="50"
						></textarea>
					</div>
				</div>
			</div>
			<input type="hidden" className="btn blue" id="user-id" />
			<div className="profile-edit-btns">
				<div className="input-field">
					<input type="submit" className="btn pink" id="submitBtn" />
				</div>
				<div className="input-field">
					<button className="btn blue cancel" id="edit">
						Edit
					</button>
					<button
						className="btn blue cancel"
						id="cancel"
						style={{ display: 'none' }}
					>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
};

export default ProfileForm;
