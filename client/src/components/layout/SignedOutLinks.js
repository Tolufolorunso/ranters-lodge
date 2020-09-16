import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

const SignedOutLinks = () => {
	return (
		<ul className="right hide-on-med-and-down">
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/users/login">login</NavLink>
			</li>
			<li>
				<NavLink to="/users/register">Register</NavLink>
			</li>
		</ul>
	);
};

// SignedOutLinks.propTypes = {};

export default SignedOutLinks;
