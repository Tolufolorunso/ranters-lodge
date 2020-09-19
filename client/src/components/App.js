import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './auth/Login';
import Navbar from './layout/navigation/Navbar';
import Register from './auth/Register';
import Newsfeed from './pages/newsfeed/Newsfeed';
import ForgetPassword from './auth/ForgetPassword';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Profile from './profile/Profile';
import Message from './message/Message';
import Home from './pages/home/Home';
import Footer from './layout/footer/Footer';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/users/login" component={Login} />
					<Route exact path="/users/register" component={Register} />
					<Route path="/users/forgetpassword" component={ForgetPassword} />
					<Route path="/ranter/newsfeed" component={Newsfeed} />
					<Route path="/users/me" component={Profile} />
					<Route exact path="/users/message" component={Message} />
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
