import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import './auth.css';

const Login = props => {
	const { location, history } = props;
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated, loadUser } = authContext;

	useEffect(() => {
		loadUser();
		if (isAuthenticated) {
			if (location.state && location.state.from) {
				history.push(location.state.from);
			} else {
				history.push('/ranter/newsfeed');
			}
		}
		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

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
		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else {
			login(formData);
		}
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
					Don't have an account?{' '}
					<Link to="/users/register" className="pink-text">
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
