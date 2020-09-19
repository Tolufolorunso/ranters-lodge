import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
	return (
		<footer className="page-footer footer">
			<div className="container">
				<h3 className="pink-text">Ranter</h3>
				<div className="row">
					<div className="col l2">
						<h5>About</h5>
						<ul>
							<li>
								<Link to="/" className="black-text text-lighten-1">
									Our Story
								</Link>
							</li>
							<li>
								<Link to="/" className="black-text text-lighten-1">
									Blog
								</Link>
							</li>
							<li>
								<Link to="/" className="black-text text-lighten-1">
									Support
								</Link>
							</li>
						</ul>
					</div>
					<div className="col l3">
						<h5>Company</h5>
						<ul>
							<li>
								<Link to="/" className="black-text text-lighten-1">
									Cookie Statement
								</Link>
							</li>
							<li>
								<Link to="/" className="black-text text-lighten-1">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link to="/" className="black-text text-lighten-1">
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
					<div className="col offset-l2 l5">
						<h5>Subscribe to our newsletter</h5>
						<div className="input-field row">
							<div className="form-group col s7">
								<input type="text" name="" id="" />
							</div>
							<button type="submit" className="subscribe" id="add-button">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container">
					&copy; {new Date().getFullYear()}
					<a
						href="https://twitter.com/developer_tolu"
						target="_blank"
						rel="noopener noreferrer"
						className="right"
					>
						Tolulope Folorunso
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
