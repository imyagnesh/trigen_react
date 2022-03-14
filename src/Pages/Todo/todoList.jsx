import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ({
  todoList,
  toggleComplete,
  handleDelete,
}) => (
  <div className="todoList-wrapper">
    {todoList.map(item => (
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
  toggleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(TodoList);
