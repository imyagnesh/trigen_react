import React, { Component, createRef } from 'react';
import './style.css';

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
        <form onSubmit={this.handleAddTodo}>
          <input
            type="text"
            name="txtTodo"
            ref={this.todoText}
          />
          <button type="submit">Add Todo</button>
        </form>
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
              <div
                key={item.id}
                className="todoItem-wrapper">
                <input
                  type="checkbox"
                  name="toggleComplete"
                  checked={item.isComplete}
                  onChange={() => this.toggleComplete(item)}
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
                  onClick={() =>
                    this.handleDelete(item.id)
                  }>
                  Delete
                </button>
              </div>
            ))}
        </div>
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
