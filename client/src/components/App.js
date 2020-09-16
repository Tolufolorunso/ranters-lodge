import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './auth/Login';
import Navbar from './layout/Navbar';
import Register from './auth/Register';
import ForgetPassword from './auth/ForgetPassword';

import './App.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" />
					<Route exact path="/users/login" component={Login} />
					<Route exact path="/users/register" component={Register} />
					<Route path="/users/forgetpassword" component={ForgetPassword} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
