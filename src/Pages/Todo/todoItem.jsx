import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  item,
  toggleComplete,
  handleDelete,
}) => (
  <div className="todoItem-wrapper">
    <input
      type="checkbox"
      name="toggleComplete"
      checked={item.isComplete}
      onChange={() => toggleComplete(item)}
    />
    <span
      style={{
        textDecoration: item.isComplete
          ? 'line-through'
          : 'none',
      }}>
      {item.text}
    </span>
    <button
      type="button"
      onClick={() => handleDelete(item.id)}>
      Delete
    </button>
  </div>
);

TodoItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(TodoItem);
