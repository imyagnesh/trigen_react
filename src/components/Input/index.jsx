import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  field: { name, onChange, ...field },
  form: { touched, errors },
  id,
  placeholder,
  isFirst,
  isLast,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <input
      id={id}
      placeholder={placeholder}
      className={classNames(
        'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
        {
          'border-red-400 focus:border-red-500':
            errors[name] && touched[name],
          'rounded-t-md': !!isFirst,
          'rounded-b-md': !!isLast,
        },
      )}
      onChange={event => {
        onChange(event);
      }}
      name={name}
      {...field}
      {...props}
    />
    {errors[name] && touched[name] && (
      <p className="text-xs text-red-500 my-1">
        {errors[name]}
      </p>
    )}
  </div>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
};

Input.defaultProps = {
  isFirst: false,
  isLast: false,
};

export default Input;
