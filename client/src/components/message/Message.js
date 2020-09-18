import React from 'react';
import MyNewsfeed from '../layout/MyNewsfeed';
import ProfileCard from '../layout/ProfileCard';
import CreatePost from '../pages/newsfeed/CreatePost';
import './message.css';
import MessageList from './MessageList';
import FriendLists from './FriendLists';
import SendMessage from './SendMessage';

const Message = () => {
	return (
		<section className="newsfeed">
			<div className="container">
				<div className="row mt-m">
					<div className="col l4 m12">
						<ProfileCard />
						<MyNewsfeed />
					</div>
					<div className="col l8 m12">
						<CreatePost />
						<div className="chat-box">
							<div className="chat-box__main">
								<div className="chat-box__main-header">
									<img
										src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
										alt="avatar"
									/>
									<div className="about">
										<div className="chat-with">Chat with Vincent Porter</div>
										<div className="chat-num-messages">
											already 1 902 messages
										</div>
									</div>
									<i className="fa fa-star"></i>
								</div>
								<div className="chat-box__main-history scrollbar">
									<ul>
										<MessageList userClass={'sender'} />
										<MessageList userClass={'receiver'} />
										<MessageList userClass={'sender'} />
										<MessageList userClass={'sender'} />
										<MessageList userClass={'receiver'} />
										<MessageList userClass={'sender'} />
									</ul>
								</div>
								<SendMessage />
							</div>
							<div className="chat-box__online">
								<div className="search">
									<input type="text" placeholder="search" />
									<i className="fa fa-search"></i>
								</div>
								<ul className="lists scrollbar">
									<FriendLists />
									<FriendLists />
									<FriendLists />
									<FriendLists />
									<FriendLists />
									<FriendLists />
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Message;
