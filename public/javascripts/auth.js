const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const alertBox = document.getElementById('alert-box');
const showForm = document.getElementById('login-register');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');

function eventListener() {
	if (registerForm) {
		registerForm.addEventListener('submit', registerNewUser);
	}

	if (loginForm) {
		loginForm.addEventListener('submit', loginUser);
	}

	if (loginLink) {
		loginLink.addEventListener('click', showLogin);
	}
	if (registerLink) {
		registerLink.addEventListener('click', showRegister);
	}
}

const showLogin = evt => {
	registerForm.style.display = 'none';
	console.log('login');
	showForm.style.transform = 'translateY(0)';
};
const showRegister = evt => {
	loginForm.style.display = 'none';
	console.log('register');
	showForm.style.transform = 'translateY(0)';
};

// @desc show alert
const showAlertMessage = (message, className) => {
	alertBox.classList.add('block');
	alertBox.style.background = '#0eadf4';
	alertBox.innerHTML = `<p>${message}</p>`;
	setTimeout(() => {
		alertBox.classList.remove('block');
		alertBox.innerHTML = '';
	}, 3000);
};

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
		// gender: evt.target.gender.value,
		password: evt.target.password.value,
		passwordConfirm: evt.target.passwordConfirm.value
	};
	postData(body, 'POST', '/auth/register')
		.then(data => {
			if (data.status === 'success') {
				setTimeout(() => location.assign('/auth/login'), 1000);
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
