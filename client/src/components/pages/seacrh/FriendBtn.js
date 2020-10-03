import React from 'react';
import { Link } from 'react-router-dom';

const FriendBtn = ({ friend, handleClick, acceptOrReject }) => {
	const handleLink = () => {
		if (friend.type === 'Add') {
			handleClick({
				username: friend.username,
				userId: friend.id
			});
		} else if (friend.type === 'Accept') {
			handleClick({
				username: friend.username,
				name: friend.name,
				acceptOrReject,
				id: friend.id
			});
		} else if (acceptOrReject === 'reject') {
			handleClick({
				username: friend.username,
				name: friend.name,
				acceptOrReject,
				id: friend.id
			});
		}
	};
	return (
		<Link to="#" style={{ marginRight: '10px' }} onClick={handleLink}>
			{acceptOrReject === 'reject' ? 'Reject' : friend.type}
		</Link>
	);
};

export default FriendBtn;
