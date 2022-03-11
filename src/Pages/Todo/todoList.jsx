import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({
  todoList,
  filterType,
  toggleComplete,
  handleDelete,
}) => (
  <div className="todoList-wrapper">
    {todoList
      .filter(x => {
        switch (filterType) {
          case 'completed':
            return x.isComplete;
          case 'pending':
            return !x.isComplete;
          default:
            return true;
        }
      })
      .map(item => (
        <TodoItem
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
        />
      ))}
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  filterType: PropTypes.oneOf([
    'all',
    'pending',
    'completed',
  ]).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(TodoList);
