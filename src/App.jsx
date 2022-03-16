import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import Login from './pages/Auth/Login';
import Home from './pages/Main/Home';

const App = () => (
  <>
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/auth">Login</Link>
      </nav>
    </header>
    <Routes>
      <Route
        path="/"
        element={
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        }
      />
      <Route path="/auth" element={<Login />} />
    </Routes>
  </>
);

export default App;
