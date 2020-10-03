import React, { useEffect, useContext } from 'react';
import './UserProfile.css';
import AuthContext from '../../context/auth/authContext';
import profileContext from '../../context/profile/profileContext';
import Spinner from '../../components/layout/spinner/Spinner';

const UserProfile = props => {
	const profileUser = props.match.params.username;
	const { getUserProfile, profile, loading } = useContext(profileContext);
	const { loadUser } = useContext(AuthContext);

	useEffect(() => {
		getUserProfile(profileUser);
		loadUser();
		// eslint-disable-next-line
	}, [profileUser]);
	return <>{loading ? <Spinner /> : <p>{profile.name}</p>}</>;
};

export default UserProfile;
