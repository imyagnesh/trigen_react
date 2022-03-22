import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  field: { checked, onChange, name },
  id,
  label,
}) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
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

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default Checkbox;
