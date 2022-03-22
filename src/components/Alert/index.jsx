import classNames from 'classnames';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = ({
  type,
  title,
  description,
  index,
  clearError,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearError();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={classNames(
        'fixed p-4 z-10  w-full md:w-1/2 lg:w-1/3',
      )}
      style={{
        bottom: `${index * 5}rem`,
      }}
      role="alert">
      <div
        className={classNames('border-t-4', {
          'border-red-500': type === 'error',
          'border-teal-500': type === 'success',
        })}
      />
      <div
        className={classNames(
          'flex px-4 py-3 rounded-b shadow-md',
          {
            'bg-teal-100 text-teal-900': type === 'success',
            'bg-red-100 text-red-900': type === 'error',
          },
        )}>
        <div className="py-1">
          {type === 'success' && (
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          )}
          {type === 'error' && (
            <svg
              className="fill-current h-6 w-6 text-red-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default Alert;
