import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Main from './pages/Main';
import Cart from './pages/Main/Cart';
import Home from './pages/Main/Home';

const App = () => (
  <Routes>
    {/* Layout Route */}
    <Route
      path="/"
      element={
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      }>
      {/* Child Routes */}
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
    </Route>
    {/* Layout Route */}
    <Route path="/auth" element={<Auth />}>
      {/* Children */}
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
);

export default App;
