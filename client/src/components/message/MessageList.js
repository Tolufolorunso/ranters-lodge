import React from 'react';

const MessageList = props => {
	const { userClass } = props;
	return (
		<li id="sender" className={userClass === 'sender' ? 'sender' : 'receiver'}>
			<div className="message-data">
				<span className="message-data-time">10:10 AM, Today</span>
				{userClass === 'receiver' ? (
					<span className="message-data-name">Kola</span>
				) : (
					''
				)}

				<i className="fa fa-circle me"></i>
			</div>
			<div className="message">
				Hi Vincent, how are you? How is the project coming along?
			</div>
		</li>
	);
};

export default MessageList;
