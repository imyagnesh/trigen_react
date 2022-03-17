import classNames from 'classnames';
import React from 'react';

const Select = ({
  field: { name, onChange, ...field },
  form: { touched, errors },
  placeholder,
  id,
  isFirst,
  isLast,
  options,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <select
      id={id}
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
      {...props}>
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
    {errors[name] && touched[name] && (
      <p className="text-xs text-red-500 my-1">
        {errors[name]}
      </p>
    )}
  </div>
);

export default Select;
