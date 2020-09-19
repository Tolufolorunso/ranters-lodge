import React from 'react';
import { NavLink } from 'react-router-dom';

const NavDropdown = () => {
	return (
		<ul
			id="dropdown1"
			className="dropdown-content"
			style={{ left: '1050.59px !important', top: '56.25px !important' }}
		>
			<li>
				<NavLink to="/users/me" className="pink-text">
					profile
				</NavLink>
			</li>
			<li>
				<NavLink to="/users/message" className="pink-text">
					Message
				</NavLink>
			</li>
			<li>
				<NavLink to="/" className="pink-text">
					logout
				</NavLink>
			</li>
		</ul>
	);
};

export default NavDropdown;
