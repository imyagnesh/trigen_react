/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './configureStore';
import { AuthProvider } from './context/authContext';
import { LocaleProvider } from './context/localeContext';
import './main.css';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <LocaleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocaleProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById('root'),
);
