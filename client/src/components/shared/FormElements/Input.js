import React from 'react';

const Input = props => {
	const element =
		props.element === 'input' ? (
			<input
				type={props.email}
				id={props.id || ''}
				placeholder={props.placeholder || 3}
			/>
		) : (
			<textarea id={props.id} rows={props.rows || 3} />
		);
	return (
		<div className="input-field">
			<label htmlFor="email">Email</label>
			{element}
		</div>
	);
};

export default Input;
