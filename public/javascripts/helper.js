const helper = () => {
	const spinner = document.getElementById('spinner');
	return {
		async showAlertMessage(message, className) {
			alertBox.classList.add('block');
			alertBox.style.background = className;
			alertBox.innerHTML = `<p>${message}</p>`;
			setTimeout(() => {
				alertBox.classList.remove('block');
				alertBox.innerHTML = '';
			}, 3000);
		}
	};
};
