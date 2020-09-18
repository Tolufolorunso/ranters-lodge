import React from 'react';
import MyNewsfeed from '../../layout/MyNewsfeed';
import ProfileCard from '../../layout/ProfileCard';
import CreatePost from './CreatePost';
import PostContent from './PostContent';
import './newsfeed.css';

const Newsfeed = () => {
	return (
		<section className="newsfeed">
			<div className="container">
				<div className="row mt-m">
					<div className="col l3 m12 s12">
						<div className="Newsfeed-left">
							<ProfileCard />
							<MyNewsfeed />
						</div>
					</div>
					<div className="col offset-l1 l8 m12 s12">
						<CreatePost />
						<PostContent />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Newsfeed;
