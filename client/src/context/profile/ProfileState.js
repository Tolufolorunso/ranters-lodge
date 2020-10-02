import React, { useReducer } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
	USER_IMAGE,
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR
} from '../types';

const ProfileState = ({ children }) => {
	const initialState = {
		avatar: null,
		profile: null,
		loading: true,
		error: {}
	};

	const [state, dispatch] = useReducer(profileReducer, initialState);

	// Get Profile
	const getProfile = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/v1/profile/me');
			console.log(res.data.data);
			dispatch({
				type: GET_PROFILE,
				payload: res.data.data
			});
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: error.response.data.error
			});
		}
	};

	// Update Profile
	const updateProfile = async formData => {
		try {
			const res = await axios.put('/api/v1/profile', formData, {
				headers: {
					'content-type': 'application/json'
				}
			});
			if (res.data.status === 'success') {
				console.log(res.data.user);
				dispatch({
					type: UPDATE_PROFILE,
					payload: res.data.user
				});
			}
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: PROFILE_ERROR,
				payload: error.response.data.error
			});
		}
	};

	// Upload avatar
	const upload = async (file, imagePublicId) => {
		try {
			const formData = new FormData();
			formData.append('avatar', file);
			formData.append('id', imagePublicId);
			const res = await axios.patch('/api/v1/profile/me/avatar', formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			});
			console.log(res.data.avatar);
			dispatch({
				type: USER_IMAGE,
				payload: res.data.avatar
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: PROFILE_ERROR,
				payload: error.response
			});
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				avatar: state.avatar,
				upload,
				getProfile,
				profile: state.profile,
				loading: state.loading,
				updateProfile
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;
