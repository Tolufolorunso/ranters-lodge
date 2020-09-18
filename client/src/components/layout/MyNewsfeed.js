import React from 'react';
import './myNewsfeed.css';
import { Link } from 'react-router-dom';

const MyNewsfeed = () => {
	return (
		<div className="my-newsfeed">
			<ul className="my-newsfeed__nav">
				<li>
					<i className="material-icons">camera_alt</i>
					<div>
						<Link to="/newsfeed" className="my-newsfeed__nav--link">
							My Newsfeed
						</Link>
					</div>
				</li>
				<li>
					<i className="material-icons">camera_alt</i>
					<div>
						<Link to="/com" className="my-newsfeed__nav--link">
							Comforters
						</Link>
					</div>
				</li>
				<li>
					<i className="material-icons">camera_alt</i>
					<div>
						<Link to="/users/message" className="my-newsfeed__nav--link">
							Messages
						</Link>
					</div>
				</li>
				<li>
					<i className="material-icons">camera_alt</i>
					<div>
						<Link to="newsfeed.html" className="my-newsfeed__nav--link">
							Images
						</Link>
					</div>
				</li>
				<li>
					<i className="material-icons">camera_alt</i>
					<div>
						<Link to="newsfeed.html" className="my-newsfeed__nav--link">
							Videos
						</Link>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default MyNewsfeed;
