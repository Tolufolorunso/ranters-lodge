import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};
	const handleSubmit = evt => {
		evt.preventDefault();
		console.log(formData);
	};

	return (
		<div className="container">
			<form className="auth-form login-form" onSubmit={handleSubmit}>
				<h5 className="white-text center">Sign In</h5>
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
					<button className="btn pink lighten-1 z-depth-0">Login</button>
				</div>
				<div className="input-field remember-forgetPassword">
					<div className="check-box">
						<p>
							<label>
								<input type="checkbox" name="remember-me" />
								<span>Remember me</span>
							</label>
						</p>
					</div>
					<div className="forget-password">
						<Link to="/users/forgetpassword">Forget password?</Link>
					</div>
				</div>
				<p>
					<Link to="/users/register" className="pink-text">
						Not a member
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
