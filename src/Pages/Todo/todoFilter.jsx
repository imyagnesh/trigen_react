import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({ handleFilter, filterType }) => (
  <div className="filter-wrapper">
    <button
      type="button"
      style={{
        backgroundColor:
          filterType === 'all' ? 'dodgerblue' : 'GrayText',
      }}
      onClick={() => handleFilter('all')}>
      All
    </button>
    <button
      type="button"
      style={{
        backgroundColor:
          filterType === 'pending'
            ? 'dodgerblue'
            : 'GrayText',
      }}
      onClick={() => handleFilter('pending')}>
      Pending
    </button>
    <button
      type="button"
      style={{
        backgroundColor:
          filterType === 'completed'
            ? 'dodgerblue'
            : 'GrayText',
      }}
      onClick={() => handleFilter('completed')}>
      Completed
    </button>
  </div>
);

TodoFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filterType: PropTypes.oneOf([
    'all',
    'pending',
    'completed',
  ]).isRequired,
};

export default memo(TodoFilter);
