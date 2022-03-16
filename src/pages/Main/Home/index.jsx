import React from 'react';
import { LocaleContext } from '../../../context/localeContext';
import { ThemeContext } from '../../../context/themeContext';

const Home = () => {
  console.log('Home Page');
  return (
    <div>
      <h1>Home Page</h1>
      <LocaleContext.Consumer>
        {value => {
          console.log('Consumer Section');
          return (
            <>
              <p>
                Current Language is{' '}
                <strong> {value.locale}</strong>
              </p>
              <button
                type="button"
                onClick={() => value.setLocale('fr')}>
                Change Language
              </button>
            </>
          );
        }}
      </LocaleContext.Consumer>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <>
            <p>
              Current Theme is <strong>{theme}</strong>
            </p>
            <button type="button" onClick={toggleTheme}>
              Change Theme
            </button>
          </>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};

export default Home;
