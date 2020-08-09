const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

function eventListener() {
	if (registerForm) {
		registerForm.addEventListener('submit', registerNewUser);
	}

	if (loginForm) {
		loginForm.addEventListener('submit', loginUser);
	}
}

const loginUser = evt => {
	evt.preventDefault();
	const body = {
		email: evt.target.email.value,
		password: evt.target.password.value
	};

	console.log(body);
	postData(body, 'POST', '/auth/login')
		.then(data => {
			if (data.status === 'success') {
				location.assign('/ranter/newsfeed');
			} else {
				console.log(data.error);
			}
		})
		.catch(error => console.log('error line 23', error));
};
const registerNewUser = evt => {
	evt.preventDefault();
	const body = {
		name: evt.target.name.value,
		username: evt.target.username.value,
		email: evt.target.email.value,
		zip: evt.target.zip.value,
		gender: evt.target.gender.value,
		password: evt.target.password.value,
		passwordConfirm: evt.target.passwordConfirm.value,
		role: 'admin'
	};
	postData(body, 'POST', '/auth/register')
		.then(data => {
			if (data.status === 'success') {
				console.log(data);
			} else {
				console.log(data.error);
			}
		})
		.catch(error => console.log('error line 23', error));
};

const postData = async (body, reqMethod, url) => {
	const response = await fetch(url, {
		method: reqMethod,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const data = response.json();
	return data;
};

eventListener();
