import { takeEvery, call, put } from 'redux-saga/effects';
import {
  loadProductsFail,
  loadProductsSuccess,
} from '../actions/productsAction';
import axiosInstance from '../utils/axiosInstance';

function* loadProducts() {
  try {
    const res = yield call(
      axiosInstance.get,
      '660/products',
    );
    yield put(loadProductsSuccess(res.data));
  } catch (error) {
    yield put(loadProductsFail(error));
  }
}

function* loadProductsRequest() {
  yield takeEvery('LOAD_PRODUCTS_REQUEST', loadProducts);
}

export default function* rootProducts() {
  yield loadProductsRequest();
}
