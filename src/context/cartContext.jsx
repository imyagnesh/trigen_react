import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import {
  rootReducer,
  rootReducerInitValue,
} from '../reducers/rootReducer';
import axiosInstance from '../utils/axiosInstance';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    rootReducer,
    rootReducerInitValue,
  );

  const loadCart = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_CART_REQUEST',
        payload: {
          message: 'Loading Cart...',
        },
      });
      const res = await axiosInstance.get('660/cart');
      dispatch({
        type: 'LOAD_CART_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_CART_FAIL',
        payload: error,
      });
    }
  }, []);

  const addToCart = useCallback(async product => {
    try {
      dispatch({
        type: 'ADD_CART_REQUEST',
        payload: {
          message: 'Adding Item To cart...',
        },
      });
      const res = await axiosInstance.post('660/cart', {
        quantity: 1,
        productId: product.id,
      });
      dispatch({
        type: 'ADD_CART_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_CART_FAIL',
        payload: { error },
      });
    }
  }, []);

  const updateQuantity = useCallback(async cartItem => {
    try {
      dispatch({
        type: 'UPDATE_CART_REQUEST',
        payload: { message: 'Updating Cart Item' },
      });
      const res = await axiosInstance.put(
        `660/cart/${cartItem.id}`,
        cartItem,
      );
      dispatch({
        type: 'UPDATE_CART_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CART_FAIL',
        payload: { error },
      });
    }
  }, []);

  const deleteCartItem = useCallback(async cartItem => {
    try {
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
      setCart(prevValue => {
        const index = prevValue.findIndex(
          x => x.id === cartItem.id,
        );
        return [
          ...prevValue.slice(0, index),
          ...prevValue.slice(index + 1),
        ];
      });
    } catch (error) {}
  });

  const value = useMemo(
    () => ({
      cart: state.cart,
      loading: state.loading,
      error: state.error,
      loadCart,
      addToCart,
      updateQuantity,
      deleteCartItem,
    }),
    [
      state.cart,
      state.loading,
      state.error,
      loadCart,
      addToCart,
      updateQuantity,
      deleteCartItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
