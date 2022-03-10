import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, listItems }) => {
  useEffect(() => {
    const mouseMove = () => {
      console.log('Mouse Move');
    };

    document.addEventListener('mousemove', mouseMove);

    const interval = setInterval(() => {
      console.log('interval');
    }, 1000);

    // componentWillUnmount
    return () => {
      document.removeEventListener('mousemove', mouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          {listItems.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(Header);
