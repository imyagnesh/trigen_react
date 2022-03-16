import React from 'react';
import { LocaleContext } from '../../../context/localeContext';
import { ThemeContext } from '../../../context/themeContext';

const Login = () => (
  <>
    <LocaleContext.Consumer>
      {value => (
        <div>
          <h1>Login Page</h1>
          <p>
            Current language is{' '}
            <strong>{value.locale}</strong>
          </p>
        </div>
      )}
    </LocaleContext.Consumer>
    <ThemeContext.Consumer>
      {value => (
        <p>
          Current Theme is <strong>{value?.theme}</strong>
        </p>
      )}
    </ThemeContext.Consumer>
  </>
);

export default Login;
