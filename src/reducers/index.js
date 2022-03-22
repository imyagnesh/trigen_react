import { combineReducers } from 'redux';
import { productsReducer } from './productsReducer';
import cart from './cartReducer';
import loading from './loadingReducer';
import errors from './errorReducer';

export default combineReducers({
  products: productsReducer,
  cart,
  loading,
  errors,
});
