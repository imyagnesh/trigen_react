import React, {
  createContext,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

// 1. Create context
export const LocaleContext = createContext();

// 2 Create Provider
export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
