import React from 'react';
import { Link } from 'react-router-dom';
import './profileCard.css';
import userImage from '../../images/mary.jpg';

const ProfileCard = ({ userProfile: { postCount, name, avatar } }) => {
	return (
		<div className="profile__card mb-m z-depth-1">
			<div className="profile__card--img">
				<img
					src={`https:${avatar[0]}`}
					alt={`Profile of ${name}`}
					className="circle responsive-img"
				/>
			</div>

			<div className="profile__card--sub">
				<h5>
					<Link to="/users/me" className="white-text">
						{name}
					</Link>
				</h5>
				<Link to="/" className="white-text">
					{postCount} rants
				</Link>
			</div>
		</div>
	);
};

export default ProfileCard;
