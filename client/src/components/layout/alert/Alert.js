import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import AlertContext from '../../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);

	return (
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map(alert => (
			<div key={alert.id}>
				<i className="fas fa-info-circle" />
				{alert.msg}
			</div>
		))
	);
};

// Alert.propTypes = {
// 	alerts: PropTypes.array.isRequired
// };

export default Alert;
