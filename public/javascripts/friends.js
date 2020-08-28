function tolu(id) {
	return document.getElementById(id);
}
const search = (() => {
	const UI = {
		addFriend: tolu('add-friend'),
		username: tolu('query'),
		userId: tolu('user-id'),
		accept: tolu('accept'),
		reject: tolu('reject'),
		hiddenId: tolu('user-id')
	};

	const { addFriend, username, userId, hiddenId, accept, reject } = UI;

	const { postData } = fetchApi();
	const { showAlertMessage } = helper();

	const eventListener = () => {
		if (addFriend) {
			addFriend.addEventListener('click', sendFriendRequest);
		}
		if (accept) {
			accept.addEventListener('click', acceptOrRejectRequest);
		}
		if (reject) {
			reject.addEventListener('click', acceptOrRejectRequest);
		}
	};

	const acceptOrRejectRequest = evt => {
		const acceptOrReject = evt.target.textContent.toLowerCase();
		const username = evt.target.value;
		const name = document.getElementById('fullname').value;
		const body = {
			acceptOrReject,
			username,
			name,
			id: hiddenId.value
		};

		console.log(body);
		postData(body, 'POST', '/users/acceptorreject')
			.then(response => {
				console.log(response);
				showAlertMessage('Accepted', 'green');
			})
			.catch(error => {
				console.log(error);
			});
	};

	const sendFriendRequest = evt => {
		evt.preventDefault();
		const body = {
			username: username.value,
			userId: userId.value
		};
		postData(body, 'POST', '/users/addfriend')
			.then(response => {
				if (response.status === 'success') {
					showAlertMessage('Request sent', 'green');
					addFriend.textContent = 'Pending';
					addFriend.setAttribute('disabled', '');
				}
			})
			.catch(error => console.log(error));
	};
	eventListener();
})();
