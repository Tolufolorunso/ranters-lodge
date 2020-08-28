function tolu(id) {
	return document.getElementById(id);
}

const chat = (function (fetchApi, helper) {
	// const myName = document.getElementById('local-user').value;
	// socket.emit('user_connected', myName);
	// console.log(myName);
	const UI = {
		userId: tolu('user-id'),
		userName: tolu('user-name'),
		userUsername: tolu('user-username'),
		friendId: tolu('friend-id'),
		friendName: tolu('friend-name'),
		friendUsername: tolu('friend-username'),
		sendMsgForm: tolu('sendMessage'),
		sendBtn: tolu('send-btn'),
		message: tolu('message-to-send'),
		lists: tolu('lists'),
		chatWith: tolu('chat-with'),
		chatBox: tolu('chat-box__main'),
		messageBox: tolu('messages-box'),
		img: tolu('list-img')
	};
	const {
		userId,
		userName,
		userUsername,
		friendId,
		friendName,
		friendUsername,
		sendMsgForm,
		sendBtn,
		message,
		lists,
		chatWith,
		chatBox,
		messageBox,
		img
	} = UI;
	// console.log((img.src = `/users/${userId.value.trim()}/avatar`));

	const eventListener = () => {
		sendMsgForm.addEventListener('submit', sendChat);
		message.addEventListener('input', changeInputState);
		lists.addEventListener('click', friendListState, true);
	};

	const { postData } = fetchApi();

	const changeInputState = evt => {
		evt.preventDefault();
		if (message.value !== '' && friendUsername.value) {
			sendBtn.disabled = false;
		} else {
			sendBtn.disabled = true;
		}
	};

	const autoscroll = () => {
		// New message element
		const newMessage = messageBox.lastElementChild;
		// Height of the new message
		const newMessageStyles = getComputedStyle(newMessage);
		const newMessageMargin = parseInt(newMessageStyles.marginBottom);
		const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

		// Visible height
		const visibleHeight = messageBox.offsetHeight;

		// Height of messages container
		const containerHeight = messageBox.scrollHeight;

		// How far have I scrolled?
		const scrollOffset = messageBox.scrollTop + visibleHeight;

		if (containerHeight - newMessageHeight <= scrollOffset) {
			messageBox.scrollTop = messageBox.scrollHeight;
		}
	};

	socket.on('message_received', function (data) {
		if (data.sender !== friendUsername.value) {
			messageBox.innerHTML = '';
			getChat(data.senderId, userId.value);
		}
		img.src = `/users/${data.senderId.trim()}/avatar`;
		friendUsername.value = data.sender;
		chatBox.style.visibility = 'visible';
		chatWith.textContent = data.senderFullname;
		const chatTemplate = `
			<li class="receiver">
					<div class="message-data align-right">
					<span class="message-data-time">10:14 AM, Today</span>&nbsp; &nbsp;
					<span class="message-data-name">Olia</span>
					<i class="fa fa-circle me"></i>
					</div>
					<div class="message other-message float-right">
					${data.message}
					</div>
				</li>
				`;
		message.value = '';

		message.focus();
		// document.getElementById('messages-box').innerHTML += chatTemplate;
		document
			.getElementById('messages-box')
			.insertAdjacentHTML('beforeend', chatTemplate);
		autoscroll();
	});

	const displayChat = chats => {
		chats = chats.reverse();
		let chatTemplate = '';
		for (let i = 0; i < chats.length; i++) {
			if (userUsername.value.trim() === chats[i].sender.username.trim()) {
				chatTemplate += `
				<li id="sender" class="sender">
					<div class="message-data">
					<span class="message-data-time">10:10 AM, Today</span>&nbsp; &nbsp;
						<span class="message-data-name">Kola</span>
						<i class="fa fa-circle me"></i>
					</div>
					<div class="message">
						${chats[i].message}
					</div>
				</li>
				`;
			} else {
				chatTemplate += `
				<li id="sender" class="receiver">
					<div class="message-data">
					<span class="message-data-time">10:10 AM, Today</span>&nbsp; &nbsp;
						<span class="message-data-name">Kola</span>
						<i class="fa fa-circle me"></i>
					</div>
					<div class="message">
						${chats[i].message}
					</div>
				</li>
				`;
			}
		}
		document.getElementById('messages-box').innerHTML = chatTemplate;
		autoscroll();
	};

	const getChat = (friendId, userId) => {
		const body = {
			friendId: friendId.trim(),
			userId: userId.trim()
		};
		postData(body, 'POST', '/users/chat')
			.then(chat => {
				if (chat.status === 'success') {
					displayChat(chat.chat);
					autoscroll();
				} else {
					console.log(chat);
				}
			})
			.catch(error => console.log('something went wrong', error));
	};

	const friendListState = evt => {
		if (evt.target.classList.contains('friend')) {
			chatBox.style.visibility = 'visible';
			chatWith.textContent = evt.target.dataset.name;
			friendUsername.value = evt.target.dataset.username;
			friendId.value = evt.target.dataset.id;
			friendName.value = evt.target.dataset.name;
			getChat(evt.target.dataset.id, userId.value);
		}
	};

	const sendChat = evt => {
		autoscroll();
		evt.preventDefault();
		const body = {
			'sender': userUsername.value.trim(),
			'receiver': friendUsername.value.trim(),
			'message': message.value.trim()
		};
		socket.emit('send_message', body);

		const chatTemplate = `
    <li id="sender" class="sender">
		<div class="message-data">
		   <span class="message-data-time">10:10 AM, Today</span>&nbsp; &nbsp;
			<span class="message-data-name">Kola</span>
			<i class="fa fa-circle me"></i>
		</div>
		<div class="message">
			${message.value}
		</div>
	</li>
    `;
		message.value = '';
		if (message.value !== '') {
			sendBtn.disabled = false;
		} else {
			sendBtn.disabled = true;
		}
		message.focus();
		// document.getElementById('messages-box').innerHTML += chatTemplate;
		document
			.getElementById('messages-box')
			.insertAdjacentHTML('beforeend', chatTemplate);
		autoscroll();
	};

	eventListener();
})(fetchApi);

// io();
