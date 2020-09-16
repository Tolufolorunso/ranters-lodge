import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
		username: '',
		name: ''
	});

	const { email, name, username, password, passwordConfirm } = formData;

	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};
	const handleSubmit = evt => {
		evt.preventDefault();

		console.log(formData);
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
					<Link to="/users/login" className="pink-text">
						Already register?
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
