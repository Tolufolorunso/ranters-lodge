import { GET_POST, ADD_POST, POST_ERROR, LIKE_POST } from '../types';

export default (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_POST:
			return {
				...state,
				posts: payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false
			};
		case LIKE_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
};
