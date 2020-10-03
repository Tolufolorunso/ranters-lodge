import React, { useReducer } from 'react';
import FriendContext from './friendContext';
import friendReducer from './friendReducer';
import axios from 'axios';
import {
	SEARCH_FRIEND,
	SEARCH_ERROR,
	ADD_FRIEND,
	REJECT_FRIEND
} from '../types';

const FriendState = ({ children }) => {
	const initialState = {
		friend: null,
		loading: true,
		error: {}
	};

	const [state, dispatch] = useReducer(friendReducer, initialState);

	// Search friend
	const searchFriend = async username => {
		try {
			const res = await axios.get(`/api/v1/users/search/${username}`);
			console.log(res.data);
			dispatch({
				type: SEARCH_FRIEND,
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: SEARCH_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	// Add friend
	const addFriend = async searchedData => {
		try {
			const res = await axios.post(`/api/v1/users/addfriend`, searchedData, {
				headers: {
					'content-type': 'application/json'
				}
			});
			console.log(res.data);
			dispatch({
				type: ADD_FRIEND,
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: SEARCH_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	// Accept Or reject friend
	const acceptOrReject = async searchedData => {
		try {
			const res = await axios.post(
				`/api/v1/users/acceptorreject`,
				searchedData,
				{
					headers: {
						'content-type': 'application/json'
					}
				}
			);
			console.log(res.data);
			dispatch({
				type: REJECT_FRIEND,
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: SEARCH_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	return (
		<FriendContext.Provider
			value={{
				searchFriend,
				addFriend,
				acceptOrReject,
				friend: state.friend,
				loading: state.loading
			}}
		>
			{children}
		</FriendContext.Provider>
	);
};

export default FriendState;
