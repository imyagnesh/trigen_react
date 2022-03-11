import React, { Component, createRef } from 'react';
import './style.css';
import TodoForm from './todoForm';
import TodoList from './todoList';

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      filterType: 'all',
    };
    this.todoText = createRef();
  }

  handleAddTodo = event => {
    event.preventDefault();
    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          {
            id: new Date().valueOf(),
            text: this.todoText.current.value,
            isComplete: false,
          },
        ],
      }),
      () => {
        this.todoText.current.value = '';
      },
    );
  };

  toggleComplete = item => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(
        x => x.id === item.id,
      );
      return {
        todoList: [
          ...todoList.slice(0, index),
          {
            ...todoList[index],
            isComplete: !todoList[index].isComplete,
          },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  handleDelete = id => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(x => x.id === id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  handleFilter = filterType => {
    this.setState({ filterType });
  };

  render() {
    const { todoList, filterType } = this.state;
    return (
      <div className="container">
        <h1>Todo App</h1>
        <TodoForm
          handleAddTodo={this.handleAddTodo}
          ref={this.todoText}
        />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleComplete={this.toggleComplete}
          handleDelete={this.handleDelete}
        />
        <div className="filter-wrapper">
          <button
            type="button"
            onClick={() => this.handleFilter('all')}>
            All
          </button>
          <button
            type="button"
            onClick={() => this.handleFilter('pending')}>
            Pending
          </button>
          <button
            type="button"
            onClick={() => this.handleFilter('completed')}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
