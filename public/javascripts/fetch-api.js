const fetchApi = () => {
	const spinner = document.getElementById('spinner');
	return {
		async postData(body, reqMethod, url) {
			console.log('postData');
			spinner.removeAttribute('hidden');
			const response = await fetch(url, {
				method: reqMethod,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			const data = response.json();
			spinner.setAttribute('hidden', '');
			return data;
		},

		async showAlertMessage() {
			alert();
		}
	};
};
