import React, { useContext, useEffect } from 'react';
import ProfileMe from './ProfileMe';
import './profile.css';
import ProfileForm from './ProfileForm';
import AuthContext from '../../context/auth/authContext';

const Profile = () => {
	const { loadUser, user } = useContext(AuthContext);

	useEffect(() => {
		loadUser();
		console.log(user);
		// eslint-disable-next-line
	}, []);
	return (
		<section className="profile" id="profile">
			<div className="container">
				<div className="row mt-s">
					<div className="col m12 l4 s12">
						<ProfileMe userData={user} />
					</div>
					<div className="col m12 l8 s12">
						<div className="profile-view center-align">
							<h1>Your Profile</h1>
							<div className="profile-edit">
								<ProfileForm userData={user} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
