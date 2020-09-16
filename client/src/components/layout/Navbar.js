import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
// import PropTypes from 'prop-types';

const Navbar = () => {
	return (
		<div>
			<nav className="nav-wrapper grey darken-3">
				<div className="container">
					<Link to="/" className="brand-logo">
						Ranter
					</Link>
					<SignedInLinks />
					<SignedOutLinks />
				</div>
			</nav>
		</div>
	);
};

// Navbar.propTypes = {};

export default Navbar;
