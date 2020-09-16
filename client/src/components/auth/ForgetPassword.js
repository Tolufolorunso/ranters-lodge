import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

const ForgetPassword = () => {
	const [formData, setFormData] = useState({
		email: ''
	});

	const { email } = formData;

	const handleChange = evt => {
		setFormData({ [evt.target.name]: evt.target.value });
	};
	const handleSubmit = evt => {
		evt.preventDefault();
		console.log(formData);
	};

	return (
		<div className="container">
			<form className="auth-form login-form" onSubmit={handleSubmit}>
				<h5 className="white-text center">Forget Password</h5>
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
					<button className="btn pink lighten-1 z-depth-0">Send</button>
				</div>
				<p>
					<Link to="/users/login" className="pink-text">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default ForgetPassword;
