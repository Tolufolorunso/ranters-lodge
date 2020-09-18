import React from 'react';
import ProfileMe from './ProfileMe';
import './profile.css';
import ProfileForm from './ProfileForm';

const Profile = () => {
	return (
		<section className="profile" id="profile">
			<div className="container">
				<div className="row mt-s">
					<div className="col m12 l4 s12">
						<ProfileMe />
					</div>
					<div className="col m12 l8 s12">
						<div className="profile-view center-align">
							<h1>Your Profile</h1>
							<div className="profile-edit">
								<ProfileForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
