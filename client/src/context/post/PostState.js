import React, { useReducer } from 'react';
import PostContext from './postContext';
import postReducer from './postReducer';
import axios from 'axios';

import { GET_POST, ADD_POST, POST_ERROR } from '../types';

const PostState = ({ children }) => {
	const initialState = {
		posts: [],
		post: null,
		loading: true,
		error: {}
	};

	const [state, dispatch] = useReducer(postReducer, initialState);

	// Get Post
	const getPost = async () => {
		try {
			const res = await axios.get('/api/v1/posts');
			dispatch({
				type: GET_POST,
				payload: res.data.data
			});
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: error.response
			});
		}
	};

	// Add Post
	const addPost = async (postData, file) => {
		try {
			const post = new FormData();
			post.append('avatar', file);
			post.append('text', postData.text);
			post.append('user', postData.user);
			post.append('name', postData.name);
			post.append('avatar', postData.avatar);
			const res = await axios.post('/api/v1/posts', post, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			});
			dispatch({
				type: ADD_POST,
				payload: res.data.post
			});
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	// Like a Post
	const likeAPost = async id => {
		try {
			await axios.put(`/api/v1/posts/like/${id}`);
			dispatch(getPost());
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	// Unlike a Post
	const unLikeAPost = async id => {
		try {
			await axios.put(`/api/v1/posts/unlike/${id}`);
			dispatch(getPost());
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	// Post comment
	const addComment = async (postId, comment) => {
		console.log(postId, comment);
		try {
			const res = await axios.post(`/api/v1/posts/comment/${postId}`, comment, {
				headers: {
					'content-type': 'application/json'
				}
			});
			console.log(res);
			dispatch(getPost());
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};

	return (
		<PostContext.Provider
			value={{
				posts: state.posts,
				loading: state.loading,
				error: state.error,
				getPost,
				addPost,
				likeAPost,
				unLikeAPost,
				addComment
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export default PostState;
