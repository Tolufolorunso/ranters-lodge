import {
	USER_IMAGE,
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	USER_PROFILE
} from '../types';

export default (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
		case USER_PROFILE:
			return {
				...state,
				avatar: payload.avatar,
				profile: payload,
				loading: false
			};
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case USER_IMAGE: {
			return {
				...state,
				avatar: payload
			};
		}
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
};
