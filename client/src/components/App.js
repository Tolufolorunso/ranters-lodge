import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './auth/Login';
import Navbar from './layout/Navbar';
import Register from './auth/Register';
import Newsfeed from './pages/newsfeed/Newsfeed';
import ForgetPassword from './auth/ForgetPassword';

import './App.css';
import Profile from './profile/Profile';
import Message from './message/Message';

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
					<Route path="/ranter/newsfeed" component={Newsfeed} />
					<Route path="/users/me" component={Profile} />
					<Route exact path="/users/message" component={Message} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
