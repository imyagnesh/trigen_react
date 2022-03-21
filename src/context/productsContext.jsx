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

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    rootReducer,
    rootReducerInitValue,
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload: {
          message: 'Loading Products...',
        },
      });
      const res = await axiosInstance.get('660/products');
      dispatch({
        type: 'LOAD_PRODUCTS_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: {
          error,
          message: 'Load Products Failed',
          title: 'Load Products',
        },
      });
    }
  }, []);

  const clearProductsError = payload => {
    dispatch({ type: 'CLEAR_ERROR', payload });
  };

  const value = useMemo(
    () => ({
      products: state.products,
      loading: state.loading,
      error: state.error,
      loadProducts,
      clearProductsError,
    }),
    [
      state.products,
      state.loading,
      state.error,
      loadProducts,
      clearProductsError,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
