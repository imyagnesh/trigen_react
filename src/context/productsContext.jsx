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
    } catch (err) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: err,
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      products: state.products,
      loading: state.loading,
      error: state.error,
      loadProducts,
    }),
    [
      state.products,
      state.loading,
      state.error,
      loadProducts,
    ],
  );

  console.log(state);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
