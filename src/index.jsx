import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/authContext';
import { LocaleProvider } from './context/localeContext';
import './main.css';

ReactDOM.render(
  <AuthProvider>
    <LocaleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  </AuthProvider>,
  document.getElementById('root'),
);
