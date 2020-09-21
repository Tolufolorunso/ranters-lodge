import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';

const NavDropdown = () => {
	const authContext = useContext(AuthContext);

	const onLogOut = () => {
		authContext.logOut();
	};
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
				<a href="/#!" className="pink-text" onClick={onLogOut}>
					logout
				</a>
			</li>
		</ul>
	);
};

export default NavDropdown;
