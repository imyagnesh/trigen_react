import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({ handleFilter }) => {
  console.log('todo filter');
  return (
    <div className="filter-wrapper">
      <button
        type="button"
        onClick={() => handleFilter('all')}>
        All
      </button>
      <button
        type="button"
        onClick={() => handleFilter('pending')}>
        Pending
      </button>
      <button
        type="button"
        onClick={() => handleFilter('completed')}>
        Completed
      </button>
    </div>
  );
};

TodoFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
