import React, {
  createContext,
  useState,
  useMemo,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (values, action) => {
    console.log(action);
    try {
      const res = await axiosInstance.post('login', values);
      console.log(res.data);
      sessionStorage.setItem(
        '@token',
        JSON.stringify(res.data),
      );
      setUser(res.data.user);
      action.resetForm();
    } catch (error) {
      action.setErrors({
        serverError: error.response.data,
      });
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
    }),
    [user, login],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
