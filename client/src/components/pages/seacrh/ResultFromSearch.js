import React from 'react';
import { Link } from 'react-router-dom';
import FriendBtn from './FriendBtn';

const ResultFromSearch = ({ friend, addFriend, acceptOrReject }) => {
	return (
		<li className="collection-item avatar">
			<img src="{`http:${friend.avatar}`}" alt="" className="circle" />
			<span className="title">Friend found</span>
			<Link
				to={`/profile/${friend.username}`}
				style={{ fontSize: '1.7rem', marginTop: '5px', display: 'block' }}
			>
				{friend.name.toUpperCase()}
			</Link>
			<div className="secondary-content" style={{ top: '30px' }}>
				{friend.type === 'Add' && (
					<FriendBtn friend={friend} handleClick={addFriend} />
				)}
				{friend.type === 'Accept' && (
					<>
						<FriendBtn
							friend={friend}
							handleClick={acceptOrReject}
							acceptOrReject={'accept'}
						/>
						<FriendBtn
							friend={friend}
							handleClick={acceptOrReject}
							acceptOrReject={'reject'}
						/>
					</>
				)}
				{friend.type === 'Pending' && <span>{friend.type}</span>}
				{friend.type === 'Friend' && <span>{friend.type}</span>}
			</div>
		</li>
	);
};

export default ResultFromSearch;
