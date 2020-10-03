import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Navbar from './components/layout/navigation/Navbar';
import Register from './components/auth/Register';
import Newsfeed from './components/pages/newsfeed/Newsfeed';
import ForgetPassword from './components/auth/ForgetPassword';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Profile from './components/profile/Profile';
import Message from './components/message/Message';
import Home from './components/pages/home/Home';
import Footer from './components/layout/footer/Footer';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Alert from './components/layout/alert/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileState from './context/profile/ProfileState';
import PostState from './context/post/PostState';
import SearchFriend from './components/pages/seacrh/SearchFriend';
import FriendState from './context/chat/FriendState';
import UserProfile from './components/profile/UserProfile';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<FriendState>
				<PostState>
					<AlertState>
						<ProfileState>
							<Router>
								<Fragment>
									<Navbar />
									<Alert />
									<Switch>
										<Route exact path="/" component={Home} />
										<Route exact path="/users/login" component={Login} />
										<Route exact path="/users/register" component={Register} />
										<Route
											path="/users/forgetpassword"
											component={ForgetPassword}
										/>
										<PrivateRoute
											exact
											path="/ranter/newsfeed"
											component={Newsfeed}
										/>
										<PrivateRoute exact path="/users/me" component={Profile} />
										<PrivateRoute
											exact
											path="/users/message"
											component={Message}
										/>
										<PrivateRoute
											exact
											path="/users/search"
											component={SearchFriend}
										/>
										<PrivateRoute
											exact
											path="/profile/:username"
											component={UserProfile}
										/>
									</Switch>
									<Footer />
								</Fragment>
							</Router>
						</ProfileState>
					</AlertState>
				</PostState>
			</FriendState>
		</AuthState>
	);
}

export default App;
