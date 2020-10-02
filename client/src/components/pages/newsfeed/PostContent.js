import React from 'react';
// import postImage from '../../../images/mary.jpg';
import GetComments from './GetComments';
import PostComment from './PostComment';
import PostImage from './PostImage';
import PosterImage from './PosterImage';
import PosterDetails from './PosterDetails';
import PostText from './PostText';

const PostContent = ({
	userProfile,
	name,
	posts,
	likeAPost,
	unLikeAPost,
	addComment
}) => {
	return (
		<>
			{posts.map(post => (
				<div className="postContent" key={post._id}>
					<PostImage postImage={post.image} postPoster={post.name} />
					<div className="postContent__detail">
						<div className="row">
							<div className="col l2 m3 flex-c">
								<PosterImage
									postAvatar={post.user.avatar}
									name={post.user.name}
								/>
							</div>
							<div className="col l10 m9">
								<PosterDetails
									post={post}
									likeAPost={likeAPost}
									userProfile={userProfile}
									unLikeAPost={unLikeAPost}
								/>
								<div className="divider"></div>
								<PostText post={post} />
								<div className="divider"></div>
								<GetComments post={post} />
								<PostComment
									userProfile={userProfile}
									name={name}
									addComment={addComment}
									post={post}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default PostContent;
