import React, { useContext, useEffect } from 'react';
import MyNewsfeed from '../../layout/MyNewsfeed';
import ProfileCard from '../../layout/ProfileCard';
import CreatePost from './CreatePost';
import PostContent from './PostContent';
import './newsfeed.css';
import AuthContext from '../../../context/auth/authContext';
import PostContext from '../../../context/post/postContext';
import Spinner from '../../layout/spinner/Spinner';

const Newsfeed = () => {
	const { loadUser, user } = useContext(AuthContext);
	const {
		addPost,
		getPost,
		posts,
		likeAPost,
		unLikeAPost,
		addComment
	} = useContext(PostContext);

	useEffect(() => {
		loadUser();
		getPost();
		// eslint-disable-next-line
	}, []);

	return (
		<section className="newsfeed">
			<div className="container">
				{user === null ? (
					<Spinner />
				) : (
					<div className="row mt-m">
						<div className="col l3 m12 s12">
							<div className="Newsfeed-left">
								<ProfileCard userProfile={user} />
								<MyNewsfeed />
							</div>
						</div>
						<div className="col offset-l1 l8 m12 s12">
							<CreatePost
								userProfile={user}
								name={user.name}
								addPost={addPost}
							/>
							<PostContent
								userProfile={user}
								name={user.name}
								posts={posts}
								likeAPost={likeAPost}
								unLikeAPost={unLikeAPost}
								addComment={addComment}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Newsfeed;
