import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { register, error, isAuthenticated, loadUser } = authContext;

	const [user, setUser] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
		username: '',
		name: ''
	});

	useEffect(() => {
		loadUser();
		if (isAuthenticated) {
			props.history.push('/ranter/newsfeed');
		}
		if (error) {
			console.log(error);
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const { email, name, username, password, passwordConfirm } = user;

	const handleChange = evt => {
		setUser({ ...user, [evt.target.name]: evt.target.value });
	};
	const handleSubmit = evt => {
		evt.preventDefault();

		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== passwordConfirm) {
			setAlert('Password not match', 'danger');
		} else {
			register({ email, name, username, password, passwordConfirm });
		}
	};

	return (
		<div className="container">
			<form className="auth-form register-form" onSubmit={handleSubmit}>
				<h5 className="white-text center">Sign Up</h5>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" value={name} onChange={handleChange} />
				</div>
				<div className="input-field">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={handleChange}
						value={password}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="passwordConfirm">Confirm Password</label>
					<input
						type="password"
						id="passwordConfirm"
						name="passwordConfirm"
						onChange={handleChange}
						value={passwordConfirm}
					/>
				</div>
				<div className="input-field">
					<button className="btn pink lighten-1 z-depth-0">Register</button>
				</div>
				<p>
					Already have an account?{' '}
					<Link to="/users/login" className="pink-text">
						Sign In
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
