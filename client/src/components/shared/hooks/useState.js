import { useState } from 'react';
function useToggle(initialVal = '') {
	const [state, setState] = useState(initialVal);

	const handleChange = e => {
		setState(e.target.value);
	};

	return [state, handleChange];
}

export default useToggle;
