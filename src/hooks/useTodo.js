import { useReducer, useCallback } from 'react';
import {
  todoAppInitialValues,
  todoAppReducer,
} from '../reducers/todoReducers';

const useTodo = inputRef => {
  const [state, dispatch] = useReducer(
    todoAppReducer,
    todoAppInitialValues,
  );

  const loadData = useCallback(async ft => {
    try {
      dispatch({ type: 'LOAD_TODO_REQUEST' });
      let url =
        'http://localhost:3004/todoList?_sort=id&_order=desc';
      if (ft !== 'all') {
        url = `${url}&isComplete=${ft === 'completed'}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      dispatch({
        type: 'LOAD_TODO_SUCCESS',
        payload: {
          todoList: json,
          filterType: ft,
        },
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_TODO_FAIL',
        payload: error,
      });
    }
  }, []);

  const handleAddTodo = useCallback(async event => {
    try {
      dispatch({ type: 'ADD_TODO_REQUEST' });
      event.preventDefault();
      const res = await fetch(
        'http://localhost:3004/todoList',
        {
          method: 'POST',
          body: JSON.stringify({
            text: inputRef.current.value,
            isComplete: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const json = await res.json();
      dispatch({ type: 'ADD_TODO_SUCCESS', payload: json });
    } catch (error) {
      dispatch({
        type: 'ADD_TODO_FAIL',
        payload: error,
      });
    }
  }, []);

  const toggleComplete = useCallback(async item => {
    console.log('toggle complete called');
    try {
      dispatch({ type: 'UPDATE_TODO_REQUEST' });
      const res = await fetch(
        `http://localhost:3004/todoList/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...item,
            isComplete: !item.isComplete,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const json = await res.json();
      dispatch({
        type: 'UPDATE_TODO_SUCCESS',
        payload: json,
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_TODO_FAIL',
        payload: error,
      });
    }
  }, []);

  const handleDelete = useCallback(async id => {
    console.log('delete todo called');
    try {
      dispatch({ type: 'DELETE_TODO_REQUEST' });
      await fetch(`http://localhost:3004/todoList/${id}`, {
        method: 'DELETE',
      });
      dispatch({
        type: 'DELETE_TODO_SUCCESS',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_TODO_FAIL',
        payload: error,
      });
    }
  }, []);

  return {
    handleDelete,
    toggleComplete,
    handleAddTodo,
    loadData,
    state,
  };
};

export default useTodo;
