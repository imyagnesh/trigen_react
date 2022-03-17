import React from 'react';

const Checkbox = ({
  field: { value, onChange, name },
  id,
  label,
}) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={value}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label
      htmlFor={id}
      className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
);

export default Checkbox;
