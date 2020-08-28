const profilePage = document.getElementById('profile');
function tolu(id) {
	return document.getElementById(id);
}

const profile = (function (fetchApi, helper) {
	const UI = {
		name: tolu('name'),
		username: tolu('username'),
		city: tolu('city'),
		gender: tolu('gender'),
		zip: tolu('zip'),
		bio: tolu('bio'),
		editBtn: tolu('edit'),
		submitBtn: tolu('submitBtn'),
		cancelBtn: tolu('cancel'),
		profileForm: tolu('profile-form'),
		avatar: tolu('avatar'),
		spinner: tolu('spinner')
	};

	const {
		name,
		username,
		city,
		gender,
		zip,
		bio,
		profileForm,
		submitBtn,
		cancelBtn,
		editBtn,
		avatar,
		spinner
	} = UI;

	const { postData } = fetchApi();
	const { showAlertMessage } = helper();

	const eventListener = () => {
		profileForm.addEventListener('submit', updateProfile);
		editBtn.addEventListener('click', changeUpdateState);
		cancelBtn.addEventListener('click', cancelUpdateState);
		avatar.addEventListener('change', changeAvatar);
	};

	// const updateUI = data => {
	// 	console.log(data);
	// };

	const changeUpdateState = evt => {
		evt.preventDefault();
		name.disabled = false;
		username.disabled = false;
		city.disabled = false;
		zip.disabled = false;
		gender.disabled = false;
		bio.disabled = false;
		editBtn.style.display = 'none';
		cancelBtn.style.display = 'block';
		submitBtn.style.display = 'block';
	};

	const cancelUpdateState = evt => {
		evt.preventDefault();
		name.disabled = true;
		zip.disabled = true;
		gender.disabled = true;
		username.disabled = true;
		city.disabled = true;
		bio.disabled = true;
		cancel.style.display = 'none';
		edit.style.display = 'block';
		submitBtn.style.display = 'none';
	};

	var upload = async data => {
		const fd = new FormData();
		fd.append('avatar', data);
		spinner.removeAttribute('hidden');
		const result = await fetch('/users/me/avatar/', {
			method: 'PATCH',
			body: fd
		});
		const response = await result.json();
		spinner.setAttribute('hidden', '');
		if (response.status == 'fail') {
			throw new Error(response.message);
		}

		return response;
	};

	const changeAvatar = evt => {
		evt.preventDefault();
		upload(avatar.files[0])
			.then(data => {
				const img = document.getElementById('profile-pic');
				img.src = `/users/${data._id}/avatar/`;
				showAlertMessage('Avatar uploaded successfully', 'green');
				// img.src = `data:image/png;base64,${data.avatar}`;
			})
			.catch(error => {
				showAlertMessage(error.message, 'red');
			});
	};

	const updateProfile = evt => {
		evt.preventDefault();
		const body = {
			name: name.value,
			zip: zip.value,
			gender: gender.value,
			username: username.value,
			city: city.value,
			bio: bio.value
		};
		postData(body, 'PUT', '/users/me')
			.then(data => {
				if (data.status === 'success') {
					// updateUI(data);
					cancelUpdateState(evt);
					showAlertMessage('Profile updated', 'green');
				} else {
					// showAlert(false, data);
				}
			})
			.catch(error => console.log('something went wrong', error));
	};

	return {
		publicApi() {
			eventListener();
		}
	};
})(fetchApi, helper);

if (profilePage) {
	profile.publicApi();
}
