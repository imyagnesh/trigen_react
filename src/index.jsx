import React from 'react';
import { render } from 'react-dom';
import './style.css';

// Rules of React Component
// 1. name of Component(react function) should be start with capital letter;
// 2. Should return single element from component(react function)
// 3. use inline style as object and object property should be in camel case;
// 4. use classname instead of class as class is reserve word in javascript

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Component</li>
      </ul>
    </nav>
  </header>
);

// Component
const App = () => (
  <div className="container">
    <Header />
    <h1
      style={{
        backgroundColor: 'red',
        color: 'green',
      }}>
      Hello
    </h1>
    <h2>hello world</h2>
    <input type="text" />
  </div>
);

render(<App />, document.getElementById('root'));
