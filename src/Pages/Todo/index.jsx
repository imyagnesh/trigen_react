import React, { Component, createRef } from 'react';
import './style.css';

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
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
    this.setState(({ todoList }) => ({
      todoList: todoList.map(value => {
        if (value.id === item.id) {
          return {
            ...value,
            isComplete: !value.isComplete,
          };
        }
        return value;
      }),
    }));
  };

  render() {
    const { todoList } = this.state;
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
          {todoList.map(item => (
            <div key={item.id} className="todoItem-wrapper">
              <input
                type="checkbox"
                name="toggleComplete"
                checked={item.isComplete}
                onChange={() => this.toggleComplete(item)}
              />
              <span>{item.text}</span>
              <button type="button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Todo;
