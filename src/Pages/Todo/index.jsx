import React, { Component, createRef } from 'react';

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
    this.todoText = createRef();
  }

  handleAddTodo = () => {
    this.setState(({ todoList }) => ({
      todoList: [
        ...todoList,
        {
          id: new Date().valueOf(),
          text: this.todoText.current.value,
        },
      ],
    }));
  };

  render() {
    console.log('todo render');
    const { todoList } = this.state;
    return (
      <div>
        <h1>Todo App</h1>
        <div>
          <input
            type="text"
            name="txtTodo"
            ref={this.todoText}
          />
          <button
            type="button"
            onClick={this.handleAddTodo}>
            Add Todo
          </button>
        </div>
        <ul>
          {todoList.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
