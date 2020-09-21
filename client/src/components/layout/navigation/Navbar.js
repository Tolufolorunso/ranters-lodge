import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import AuthContext from '../../../context/auth/authContext';
// import PropTypes from 'prop-types';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { user, isAuthenticated } = authContext;
	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					Ranter
				</Link>
				{isAuthenticated ? <SignedInLinks user={user} /> : <SignedOutLinks />}
			</div>
		</nav>
	);
};

// Navbar.propTypes = {};

export default Navbar;
