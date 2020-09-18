import React from 'react';

const SendMessage = () => {
	return (
		<div className="chat-box__main-message">
			<textarea
				name="message-to-send"
				id="message-to-send"
				placeholder="Type your message"
				rows="7"
			></textarea>
			<i className="fa fa-file-o"></i>
			<i className="fa fa-file-image-o"></i>
			<button className="btn right blue">Send</button>
		</div>
	);
};

export default SendMessage;
