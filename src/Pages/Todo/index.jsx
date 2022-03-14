import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback,
  // useMemo,
} from 'react';
import {
  todoAppInitialValues,
  todoAppReducer,
} from '../../reducers/todoReducers';
import './style.css';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';

// manage State
// lifecycle methods
// data manipulation

// > 16.8
// Hooks
// Hooks is used to manage data in function componennt

const Todo = () => {
  const [
    { isLoading, todoList, hasError, filterType },
    dispatch,
  ] = useReducer(todoAppReducer, todoAppInitialValues);
  const inputRef = useRef();

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

  // non-premitive type of data
  // const title = useMemo(() => ({ name: 'yagnesh' }), []);

  // component Did Mount
  useEffect(() => {
    loadData('all');
  }, []);

  console.log('Todo App render');

  if (hasError) {
    return <h1>{hasError.message}</h1>;
  }

  return (
    <div className="container">
      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader">Loading...</div>
        </div>
      )}
      <h1>Todo App</h1>
      <TodoForm
        ref={inputRef}
        handleAddTodo={handleAddTodo}
      />
      <TodoList
        todoList={todoList}
        toggleComplete={toggleComplete}
        handleDelete={handleDelete}
      />
      <TodoFilter
        handleFilter={loadData}
        filterType={filterType}
      />
    </div>
  );
};

// export class Todo extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todoList: [],
//       isLoading: false,
//       filterType: 'all',
//       hasError: false,
//     };
//     this.todoText = createRef();
//   }

//   async componentDidMount() {
//     this.loadTodo('all');
//   }

//   loadTodo = async filterType => {
//     try {
//       this.setState({ isLoading: true });
//       let url =
//         'http://localhost:3004/todoList?_sort=id&_order=desc';
//       if (
//         filterType === undefined ||
//         filterType !== 'all'
//       ) {
//         url = `${url}&isComplete=${
//           filterType === 'completed'
//         }`;
//       }
//       const res = await fetch(url);
//       const json = await res.json();
//       this.setState({
//         todoList: json,
//         filterType,
//         isLoading: false,
//       });
//     } catch (error) {
//       this.setState({
//         hasError: error,
//         isLoading: false,
//       });
//     }
//   };

//   handleAddTodo = async event => {
//     try {
//       this.setState({ isLoading: true });
//       event.preventDefault();

//       const res = await fetch(
//         'http://localhost:3004/todoList',
//         {
//           method: 'POST',
//           body: JSON.stringify({
//             text: this.todoText.current.value,
//             isComplete: false,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//         },
//       );

//       const json = await res.json();

//       this.setState(
//         ({ todoList }) => ({
//           todoList: [json, ...todoList],
//           isLoading: false,
//         }),
//         () => {
//           this.todoText.current.value = '';
//         },
//       );
//     } catch (error) {
//       this.setState({
//         hasError: error,
//         isLoading: false,
//       });
//     }
//   };

//   toggleComplete = async item => {
//     try {
//       this.setState({ isLoading: true });
//       const res = await fetch(
//         `http://localhost:3004/todoList/${item.id}`,
//         {
//           method: 'PUT',
//           body: JSON.stringify({
//             ...item,
//             isComplete: !item.isComplete,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//         },
//       );

//       const json = await res.json();

//       this.setState(({ todoList }) => {
//         const index = todoList.findIndex(
//           x => x.id === item.id,
//         );
//         return {
//           todoList: [
//             ...todoList.slice(0, index),
//             json,
//             ...todoList.slice(index + 1),
//           ],
//           isLoading: false,
//         };
//       });
//     } catch (error) {
//       this.setState({
//         hasError: error,
//         isLoading: false,
//       });
//     }
//   };

//   handleDelete = async id => {
//     try {
//       this.setState({ isLoading: true });
//       await fetch(`http://localhost:3004/todoList/${id}`, {
//         method: 'DELETE',
//       });
//       this.setState(({ todoList }) => {
//         const index = todoList.findIndex(x => x.id === id);
//         return {
//           todoList: [
//             ...todoList.slice(0, index),
//             ...todoList.slice(index + 1),
//           ],
//           isLoading: false,
//         };
//       });
//     } catch (error) {
//       this.setState({
//         hasError: error,
//         isLoading: false,
//       });
//     }
//   };

//   render() {
//     const { todoList, filterType, isLoading, hasError } =
//       this.state;

//     if (hasError) {
//       return (
//         <h1>
//           Something Went wrong please try after sometime
//         </h1>
//       );
//     }

//     return (
//       <div className="container">
//         <h1>Todo App</h1>
//         {isLoading && (
//           <div className="loader-wrapper">
//             <div className="loader">Loading...</div>
//           </div>
//         )}
//         <TodoForm
//           handleAddTodo={this.handleAddTodo}
//           ref={this.todoText}
//         />
//         <TodoList
//           todoList={todoList}
//           toggleComplete={this.toggleComplete}
//           handleDelete={this.handleDelete}
//         />
//         <TodoFilter
//           handleFilter={this.loadTodo}
//           filterType={filterType}
//         />
//       </div>
//     );
//   }
// }

export default Todo;
