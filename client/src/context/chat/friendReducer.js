import {
	SEARCH_FRIEND,
	SEARCH_ERROR,
	ADD_FRIEND,
	REJECT_FRIEND
} from '../types';

export default (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case SEARCH_FRIEND:
		case ADD_FRIEND:
		case REJECT_FRIEND:
			return {
				...state,
				friend: payload,
				loading: false
			};
		case SEARCH_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};

		default:
			return state;
	}
};
