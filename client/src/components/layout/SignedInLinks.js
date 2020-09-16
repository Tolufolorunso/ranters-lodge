import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

const SignedInLinks = () => {
	return (
		<ul className="right hide-on-med-and-down">
			<li>
				<NavLink to="/ranter/newsfeed">NewsFeed</NavLink>
			</li>
			<li>
				<NavLink to="/contact">Contact</NavLink>
			</li>
			<li>
				<NavLink to="/">logout</NavLink>
			</li>
			<li>
				<NavLink to="/" className="btn btn-floating pink lighten-1">
					FT
				</NavLink>
			</li>
		</ul>
	);
};

// Navbar.propTypes = {};

export default SignedInLinks;
