import React, { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CartDialog from '../../components/CartDialog';
import ErrorAlert from '../../components/ErrorAlert';
import Header from '../../components/Header';
import { AuthContext } from '../../context/authContext';

const Main = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleDialog = () => {
    setOpenDialog(val => !val);
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Header toggleDialog={toggleDialog} logout={logout} />
      <CartDialog
        open={openDialog}
        toggleCart={toggleDialog}
      />
      <Outlet />
      <ErrorAlert />
    </>
  );
};

export default Main;
