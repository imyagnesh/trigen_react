import { all } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import cartSaga from './cartSaga';

export default function* rootSaga() {
  yield all([productsSaga(), cartSaga()]);
}
