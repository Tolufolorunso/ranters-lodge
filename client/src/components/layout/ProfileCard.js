import React from 'react';
import { Link } from 'react-router-dom';
import './profileCard.css';
import userImage from '../../images/mary.jpg';

const ProfileCard = () => {
	const profileCardStyle = {
		color: '#fff',
		position: 'relative',
		display: 'flex',
		width: '100%',
		padding: '10px',
		backgroundImage:
			'linear-gradient(to bottom, rgba(39, 170, 225, 0.8), rgba(28, 117, 188, 0.8)), url(../images/bg-1.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		minHeight: '90px',
		borderRadius: '3px'
	};
	return (
		<div className="profile__card mb-m z-depth-1" style={profileCardStyle}>
			<div className="profile__card--img">
				<img src={userImage} alt="profile" className="circle responsive-img" />
			</div>

			<div className="profile__card--sub">
				<h5>
					<Link to="/users/me" className="white-text">
						Full name
					</Link>
				</h5>
				<Link to="/" className="white-text">
					50 rants
				</Link>
			</div>
		</div>
	);
};

export default ProfileCard;
