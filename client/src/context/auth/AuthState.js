import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = ({ children }) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
		avatarUrl: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = async () => {
		// load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/v1/auth');
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: AUTH_ERROR
			});
		}
	};

	// Regitser User
	const register = async userData => {
		// const config = {
		// 	headers: {
		// 		'Content-Type': 'applicatioin/json'
		// 	}
		// };

		try {
			const res = await axios.post('/api/v1/auth/register', userData);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.errorMessage
			});
		}
	};

	// Login User
	const login = async formData => {
		try {
			const res = await axios.post('/api/v1/auth/login', formData);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
			loadUser();
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.errorMessage
			});
		}
	};

	// Logout
	const logOut = () => {
		dispatch({
			type: LOGOUT
		});
	};

	//Clear Errors
	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				login,
				loadUser,
				logOut,
				clearErrors
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
