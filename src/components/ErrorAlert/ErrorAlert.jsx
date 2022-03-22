import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const Alert = lazy(() => import('../Alert'));

// import Alert from '../Alert';

const ErrorAlert = ({ errors, clearError }) => (
  <>
    {errors.map((item, i) => (
      <Suspense fallback={<p>Loading...</p>}>
        <Alert
          key={`${item.actionType}_${item.loaderId}`}
          type="error"
          title={item.title}
          description={item.message}
          index={i}
          clearError={clearError}
        />
      </Suspense>
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
