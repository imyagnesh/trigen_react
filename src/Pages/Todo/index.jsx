import React, { Component, createRef } from 'react';
import './style.css';
import TodoFilter from './todoFilter';
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

  async componentDidMount() {
    try {
      const res = await fetch(
        'http://localhost:3004/todoList',
      );
      const json = await res.json();
      this.setState({
        todoList: json,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleAddTodo = async event => {
    try {
      event.preventDefault();

      const res = await fetch(
        'http://localhost:3004/todoList',
        {
          method: 'POST',
          body: JSON.stringify({
            text: this.todoText.current.value,
            isComplete: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [...todoList, json],
        }),
        () => {
          this.todoText.current.value = '';
        },
      );
    } catch (error) {}
  };

  toggleComplete = async item => {
    try {
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

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(
          x => x.id === item.id,
        );
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async id => {
    try {
      await fetch(`http://localhost:3004/todoList/${id}`, {
        method: 'DELETE',
      });
      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {
      console.log(error);
    }
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
        <TodoFilter handleFilter={this.handleFilter} />
      </div>
    );
  }
}

export default Todo;
