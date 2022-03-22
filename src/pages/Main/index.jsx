import React, {
  useContext,
  useState,
  lazy,
  Suspense,
} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import CartDialog from '../../components/CartDialog';
import ErrorAlert from '../../components/ErrorAlert';
import Header from '../../components/Header';
import { AuthContext } from '../../context/authContext';

const CartDialog = lazy(() =>
  import('../../components/CartDialog'),
);

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
      <Suspense fallback={<p>Loading...</p>}>
        {openDialog && (
          <CartDialog
            open={openDialog}
            toggleCart={toggleDialog}
          />
        )}
      </Suspense>
      <Outlet />
      <ErrorAlert />
    </>
  );
};

export default Main;
