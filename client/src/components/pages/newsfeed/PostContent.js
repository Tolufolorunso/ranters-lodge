import React from 'react';
import postImage from '../../../images/mary.jpg';
import GetComments from './GetComments';
import PostComment from './PostComment';

const PostContent = () => {
	return (
		<div className="postContent">
			<div className="postContent-img">
				<img
					src={postImage}
					alt="camera"
					className="responsive-img post-image"
				/>
			</div>
			<div className="postContent__detail">
				<div className="row">
					<div className="col l2 m3 flex-c">
						<div className="postContent__img">
							<img
								src={postImage}
								alt="Tolulope"
								className="broken-image circle responsive-img post-img"
							/>
						</div>
					</div>
					<div className="col l10 m9">
						<div className="post-detail__user-info">
							<h5>
								<a href="timeline.html" className="profile-link">
									Tolulope
								</a>
								<span className="following">following</span>
							</h5>
							<p className="text-muted">Published a photo about 3 mins ago</p>
							<div className="reaction right">
								<span className="badge white-text blue hoverable">
									<i className="fa fa-thumbs-down"></i>0
								</span>
								<span className="badge white-text blue hoverable">
									<i className="fa fa-thumbs-up"></i>
									13
								</span>
							</div>
						</div>
						<div className="divider"></div>
						<div className="post-detail__post-text">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
								<a href="#!">more...</a>
							</p>
						</div>
						<div className="divider"></div>
						<GetComments />

						<PostComment />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostContent;
