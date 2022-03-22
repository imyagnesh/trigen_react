import classNames from 'classnames';
import React from 'react';
import RDatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({
  field: { name, value, onBlur },
  form: { touched, errors, setFieldValue },
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
    <RDatePicker
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
      onChange={date => {
        setFieldValue(name, format(date, 'dd/MM/yy'));
      }}
      onBlur={onBlur}
      name={name}
      selected={
        value
          ? parse(value, 'dd/MM/yy', new Date())
          : new Date()
      }
      {...props}
    />
    {errors[name] && touched[name] && (
      <p className="text-xs text-red-500 my-1">
        {errors[name]}
      </p>
    )}
  </div>
);

DatePicker.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}).isRequired,
    errors: PropTypes.shape({}).isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

DatePicker.defaultProps = {
  isFirst: false,
  isLast: false,
};

export default DatePicker;
