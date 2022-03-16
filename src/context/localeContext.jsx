import React, { createContext, useState } from 'react';

// 1. Create context
export const LocaleContext = createContext();

// 2 Create Provider
export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
      }}>
      {children}
    </LocaleContext.Provider>
  );
};
