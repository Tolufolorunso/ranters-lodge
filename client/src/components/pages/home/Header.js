import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="home__header">
			<div className="container">
				<div className="content-wrapper">
					<h1>
						Welcome to <span className="pink-text">Ranters Lodge</span>
					</h1>
					<h2>The easiest way to rant and make friends</h2>
					<div className="input-field">
						<Link to="/users/register" className="btn pink">
							Getting started
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
