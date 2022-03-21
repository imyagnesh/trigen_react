import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import { ProductsContext } from '../../context/productsContext';
import Alert from '../Alert';

const ErrorAlert = () => {
  const { error: cartError, clearCartError } =
    useContext(CartContext);
  const { error: productsError, clearProductsError } =
    useContext(ProductsContext);

  return (
    <>
      {[...cartError, ...productsError].map((item, i) => (
        <Alert
          key={`${item.actionType}_${item.loaderId}`}
          type="error"
          title={item.title}
          description={item.message}
          index={i}
          clearError={() => {
            clearProductsError(item);
            clearCartError(item);
          }}
        />
      ))}
    </>
  );
};

export default ErrorAlert;
