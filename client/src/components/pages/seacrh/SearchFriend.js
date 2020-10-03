import React, { useEffect, useContext } from 'react';
import './SearchFriend.css';
import useState from '../../shared/hooks/useState';
import ResultFromSearch from './ResultFromSearch';
import AuthContext from '../../../context/auth/authContext';
import FriendContext from '../../../context/chat/friendContext';

const SearchFriend = () => {
	const [search, handleChange] = useState('');

	const { loadUser } = useContext(AuthContext);
	const {
		searchFriend,
		friend,
		loading,
		addFriend,
		acceptOrReject
	} = useContext(FriendContext);
	useEffect(() => {
		loadUser();
	}, []);

	const handleSearch = evt => {
		evt.preventDefault();
		searchFriend(search);
	};

	return (
		<section
			className="search"
			style={{ height: '100%', marginBottom: '200px' }}
		>
			<div className="container">
				<form className="search__form" onSubmit={handleSearch}>
					<h5
						className="pink-text center"
						style={{ marginBottom: '50px', fontSize: '3rem' }}
					>
						Search for a friend
					</h5>
					<div className="row">
						<div className="input-field">
							<label htmlFor="search">Search friend</label>
							<input
								type="text"
								name="search"
								autoComplete="on"
								id="search"
								value={search}
								onChange={handleChange}
							/>
							<span
								className="helper-text"
								data-error="wrong"
								data-success="right"
							>
								helper text for error
							</span>
						</div>
						<button className="btn waves-effect waves-light pink" type="submit">
							Search <i className="material-icons right">send</i>
						</button>
					</div>
				</form>
				{friend !== null ? (
					<ul className="collection">
						<ResultFromSearch
							friend={friend}
							loading={loading}
							addFriend={addFriend}
							acceptOrReject={acceptOrReject}
						/>
					</ul>
				) : null}
			</div>
		</section>
	);
};

export default SearchFriend;
