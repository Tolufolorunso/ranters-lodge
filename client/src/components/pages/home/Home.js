import React, { useEffect, useContext } from 'react';
import Header from './Header';
import './home.css';
import AuthContext from '../../../context/auth/authContext';

const Home = props => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loadUser } = authContext;
	useEffect(() => {
		loadUser();
		if (isAuthenticated) {
			props.history.push('/ranter/newsfeed');
		}

		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<>
			<Header />
			<section>
				<div className="container">
					<p className="flow-text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
						eaque repellendus velit rem obcaecati laboriosam earum, ex eius,
						adipisci voluptatum expedita eveniet eum molestias! Voluptate unde
						reiciendis quibusdam magnam a.
					</p>
				</div>
			</section>
		</>
	);
};
export default Home;
