import {
  takeEvery,
  call,
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import {
  addCartFail,
  addCartSuccess,
  DeleteCartFail,
  DeleteCartSuccess,
  loadCartFail,
  loadCartSuccess,
  UpdateCartFail,
  UpdateCartSuccess,
} from '../actions/cartAction';
import axiosInstance from '../utils/axiosInstance';

function* loadCart() {
  try {
    const res = yield call(axiosInstance.get, '660/cart');
    yield put(loadCartSuccess(res.data));
  } catch (error) {
    yield put(loadCartFail(error));
  }
}

function* addCartItem({ payload }) {
  try {
    const res = yield call(axiosInstance.post, '660/cart', {
      quantity: 1,
      productId: payload.loaderId,
    });
    yield put(addCartSuccess(res.data));
  } catch (error) {
    yield put(addCartFail(error, payload.loaderId));
  }
}

function* updateCartItem({ cartItem }) {
  try {
    const res = yield call(
      axiosInstance.put,
      `660/cart/${cartItem.id}`,
      cartItem,
    );
    yield put(UpdateCartSuccess(res.data));
  } catch (error) {
    yield put(UpdateCartFail(error, cartItem));
  }
}

function* deleteCartItem({ cartItem }) {
  try {
    const res = yield call(
      axiosInstance.delete,
      `660/cart/${cartItem.id}`,
    );
    yield put(DeleteCartSuccess(res.data));
  } catch (error) {
    yield put(DeleteCartFail(error, cartItem));
  }
}

function* loadCartRequest() {
  yield takeEvery('LOAD_CART_REQUEST', loadCart);
}

function* addCartItemRequest() {
  yield takeLatest('ADD_CART_REQUEST', addCartItem);
}

function* updateCartItemRequest() {
  yield takeLatest('UPDATE_CART_REQUEST', updateCartItem);
}

function* deleteCartItemRequest() {
  yield takeLatest('DELETE_CART_REQUEST', deleteCartItem);
}

export default function* rootCart() {
  yield all([
    loadCartRequest(),
    addCartItemRequest(),
    updateCartItemRequest(),
    deleteCartItemRequest(),
  ]);
}
