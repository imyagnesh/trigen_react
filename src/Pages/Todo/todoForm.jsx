import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ handleAddTodo }, ref) => {
  console.log('TodoForm Render');
  return (
    <form onSubmit={handleAddTodo}>
      <input type="text" name="txtTodo" ref={ref} />
      <button type="submit">Add Todo</button>
    </form>
  );
});

TodoForm.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
