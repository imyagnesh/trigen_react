import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import { productsReducer } from './productsReducer';

export const rootReducerInitValue = {
  products: [],
  error: [],
  loading: [],
  cart: [],
};

export const rootReducer = (state, action) => ({
  products: productsReducer(state.products, action),
  error: errorReducer(state.error, action),
  loading: loadingReducer(state.loading, action),
  cart: cartReducer(state.cart, action),
});
