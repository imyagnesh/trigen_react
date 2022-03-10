import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, listItems }) => {
  console.log('header Component');
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
