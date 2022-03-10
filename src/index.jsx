import React, { Component, createRef } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Child1 from './components/Child1';
import './style.css';
import ErrorWrapper from './components/ErrorWrapper';

// Rules of React Component
// 1. name of Component(react function) should be start with capital letter;
// 2. Should return single element from component(react function)
// 3. use inline style as object and object property should be in camel case;
// 4. use classname instead of class as class is reserve word in javascript

// Function Component
// const App = () => (
//   <div className="container">
//     <Header
//       title="Header"
//       listItems={['Home', 'About', 'Contact']}
//     />
//     <h1
//       style={{
//         backgroundColor: 'red',
//         color: 'green',
//       }}>
//       Hello
//     </h1>
//     <h2>Value of a: {a}</h2>
//     <button
//       type="button"
//       onClick={() => {
//         console.log('change A');
//         a = 15;

//         console.log(a);
//       }}>
//       Chagne A
//     </button>
//     <input type="checkbox" />
//     <Header
//       title="Title"
//       listItems={['Home', 'Projects', 'Testimonial']}
//     />
//   </div>
// );

// 4 Stages of Lifecycle method

// 1. Mounting
// -> Constructor(call only once)
//      1. define state value
//      2. Analytics
//      3. Define state value based on prop value

// Note: cant set state value async

// -> getDerivedStateFromProps
//      1. derive new State value based on new Props and new State

// -> render
//     1. convert htm to virtual dom  -> actual dom

// -> componentDidMount
//    1. manipulate dom
//    2. load data on component mount
//    3. register events

//  Note: Call only once

// 2. Updating

// 1. getDerivedStateFromProps

// 2. shouldComponentUpdate / Pure Component / Memo

// 3. render

// 4. getSnapshotBeforeUpdate

// 5. componentDidUpdate

// 2.

// 3. Unmounting

// 1. componentWillUnmount

// 4. Error

// When Prop value change or state value change then and then render method will call
class App extends Component {
  listItem = ['Home', 'About', 'Contact'];

  // Props are initial Props
  constructor(props) {
    super(props);
    this.state = {
      a: 15,
      b: 10,
      // greet: `Hello ${props.name}`,
    };

    this.h1Ref = createRef();

    console.log('constructor');

    // make api call get data
    // set data as state;

    //
  }

  // props are new Props
  // state are new State
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    // console.log(props);
    // console.log(state);
    return {
      greet: `Hello ${props.name}`,
    };
  }

  // manipulate Dom element
  // on component load fetch the data from api and displauy
  // Register events
  // Note: call only once
  componentDidMount() {
    // O(logN)
    // O(N)

    // O(1)
    this.h1Ref.current.style = 'color: yellow';

    document.addEventListener('copy', () => {
      console.log('Copied');
    });

    // make api call get data
    // set data as set state
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 10;
  }

  // Manipulate Dom element
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('snapshot', snapshot);
  }

  changeA = () => {
    this.setState(({ a }) => ({ a: a + 5 }));
  };

  changeB = () => {
    this.setState(({ b }) => ({ b: b + 5 }));
  };

  render() {
    const { a, b, greet } = this.state;
    const { name } = this.props;

    console.log('render');

    return (
      <ErrorWrapper>
        <div className="container">
          <Header
            title="Header"
            listItems={this.listItem}
          />
          <ErrorWrapper>
            {a < 25 && (
              <Child1 a={a} listItems={this.listItem} />
            )}
          </ErrorWrapper>
          <h1
            ref={this.h1Ref}
            id="heading"
            style={{
              backgroundColor: 'red',
              color: 'green',
            }}>
            {greet}
          </h1>
          <h2>value of a: {a}</h2>
          <h2>value of b: {b}</h2>
          <button type="button" onClick={this.changeA}>
            Change A
          </button>
          <button type="button" onClick={this.changeB}>
            Change B
          </button>
          <input type="checkbox" />
          <Header title="Title" listItems={this.listItem} />
        </div>
      </ErrorWrapper>
    );
  }
}

render(
  <App name="Yagnesh" />,
  document.getElementById('root'),
);
