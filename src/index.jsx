import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LocaleProvider } from './context/localeContext';
import './style.css';

ReactDOM.render(
  <LocaleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LocaleProvider>,
  document.getElementById('root'),
);
