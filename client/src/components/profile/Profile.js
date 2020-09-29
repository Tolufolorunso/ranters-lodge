import React, { useContext, useEffect } from 'react';
import ProfileMe from './ProfileMe';
import './profile.css';
import ProfileForm from './ProfileForm';
import AuthContext from '../../context/auth/authContext';
import profileContext from '../../context/profile/profileContext';
import Spinner from '../layout/spinner/Spinner';
// import ProfileContext from '../../context/profile/profileContext';

const Profile = () => {
	const { loadUser } = useContext(AuthContext);
	const {
		upload,
		avatar,
		getProfile,
		profile,
		loading,
		updateProfile
	} = useContext(profileContext);

	useEffect(() => {
		loadUser();
		getProfile();
		// eslint-disable-next-line
	}, []);

	return (
		<section className="profile" id="profile">
			<div className="container">
				<div className="row mt-s">
					<div className="col m12 l4 s12">
						{loading && profile === null ? (
							<Spinner />
						) : (
							<ProfileMe
								avatar={avatar}
								upload={upload}
								userName={profile === null ? [] : profile.username}
							/>
						)}
					</div>
					<div className="col m12 l8 s12">
						<div className="profile-view center-align">
							<h1>Your Profile</h1>
							<div className="profile-edit">
								{loading && profile === null ? (
									<Spinner />
								) : (
									<ProfileForm
										updateProfile={updateProfile}
										userProfile={profile === null ? [] : profile}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
