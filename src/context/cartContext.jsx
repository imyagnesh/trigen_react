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
        payload: {
          error,
          message: 'Load Cart Failed',
          title: 'Load Cart',
        },
      });
    }
  }, []);

  const addToCart = useCallback(async product => {
    try {
      dispatch({
        type: 'ADD_CART_REQUEST',
        payload: {
          loaderId: product.id,
          message: 'Adding Item To cart...',
        },
      });
      const res = await axiosInstance.post('660/cart', {
        quantity: 1,
        productId: product.id,
      });
      dispatch({
        type: 'ADD_CART_SUCCESS',
        payload: { ...res.data, loaderId: product.id },
      });
    } catch (error) {
      dispatch({
        type: 'ADD_CART_FAIL',
        payload: {
          error,
          loaderId: product.id,
          message: 'Add Cart Item Failed',
          title: 'Add Cart',
        },
      });
    }
  }, []);

  const updateQuantity = useCallback(async cartItem => {
    try {
      dispatch({
        type: 'UPDATE_CART_REQUEST',
        payload: {
          message: 'Updating Cart Item',
          loaderId: cartItem.productId,
        },
      });
      const res = await axiosInstance.put(
        `660/cart/${cartItem.id}`,
        cartItem,
      );
      dispatch({
        type: 'UPDATE_CART_SUCCESS',
        payload: {
          ...res.data,
          loaderId: cartItem.productId,
        },
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CART_FAIL',
        payload: {
          error,
          loaderId: cartItem.productId,
          message: 'Update Cart Item Failed',
          title: 'Update Cart',
        },
      });
    }
  }, []);

  const deleteCartItem = useCallback(async cartItem => {
    try {
      dispatch({
        type: 'DELETE_CART_REQUEST',
        payload: {
          message: 'Delete Cart Item',
          loaderId: cartItem.productId,
        },
      });
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
      dispatch({
        type: 'DELETE_CART_SUCCESS',
        payload: {
          ...cartItem,
          loaderId: cartItem.productId,
        },
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_CART_FAIL',
        payload: {
          error,
          loaderId: cartItem.productId,
          message: 'Delete Cart Item Failed',
          title: 'Delete Cart',
        },
      });
    }
  });

  const clearCartError = payload => {
    dispatch({ type: 'CLEAR_ERROR', payload });
  };

  const value = useMemo(
    () => ({
      cart: state.cart,
      loading: state.loading,
      error: state.error,
      loadCart,
      addToCart,
      updateQuantity,
      deleteCartItem,
      clearCartError,
    }),
    [
      state.cart,
      state.loading,
      state.error,
      loadCart,
      addToCart,
      updateQuantity,
      deleteCartItem,
      clearCartError,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
