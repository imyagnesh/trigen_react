import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert';

const ErrorAlert = ({ errors, clearError }) => (
  <>
    {errors.map((item, i) => (
      <Alert
        key={`${item.actionType}_${item.loaderId}`}
        type="error"
        title={item.title}
        description={item.message}
        index={i}
        clearError={clearError}
      />
    ))}
  </>
);

ErrorAlert.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      actionType: PropTypes.string.isRequired,
      loaderId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  clearError: PropTypes.func.isRequired,
};

export default ErrorAlert;
