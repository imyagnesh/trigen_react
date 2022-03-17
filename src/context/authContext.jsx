import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('@token');
    if (token) {
      const jsonToken = JSON.parse(token);
      setUser(jsonToken.user);
    }
  }, []);

  const login = async (values, actions) => {
    try {
      const { remember_me, ...rest } = values;
      const res = await axiosInstance.post('login', rest);
      sessionStorage.setItem(
        '@token',
        JSON.stringify(res.data),
      );
      setUser(res.data.user);
      actions.resetForm();
    } catch (error) {
      actions.setErrors({
        serverError: error.response.data,
      });
    }
  };

  const register = async (values, actions) => {
    try {
      const { confirmPassword, ...rest } = values;
      const res = await axiosInstance.post(
        'register',
        rest,
      );
      sessionStorage.setItem(
        '@token',
        JSON.stringify(res.data),
      );
      setUser(res.data.user);
      actions.resetForm();
    } catch (error) {
      actions.setErrors({
        serverError: error.response.data,
      });
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
