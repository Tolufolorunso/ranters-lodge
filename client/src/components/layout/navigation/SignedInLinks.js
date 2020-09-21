import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NavDropdown from './NavDropdown';
// import PropTypes from 'prop-types';
import M from 'materialize-css';

const SignedInLinks = () => {
	useEffect(() => {
		let dropdowns = document.querySelector('.dropdown-trigger');
		let options = {
			inDuration: 300,
			outDuration: 225,
			hover: false,
			belowOrigin: true
		};
		M.Dropdown.init(dropdowns, options);

		// eslint-disable-next-line
	}, []);

	return (
		<>
			<ul className="right hide-on-med-and-down">
				<li>
					<NavLink to="/ranter/newsfeed">NewsFeed</NavLink>
				</li>
				<li>
					<NavLink to="/users/message">Message</NavLink>
				</li>
				<li>
					<span
						className="btn btn-floating pink lighten-1 dropdown-trigger"
						data-target="dropdown1"
					>
						FT
					</span>
				</li>
			</ul>
			<NavDropdown />
		</>
	);
};

// Navbar.propTypes = {};

export default SignedInLinks;
