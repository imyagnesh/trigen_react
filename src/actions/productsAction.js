import axiosInstance from '../utils/axiosInstance';

export const loadProductsRequest = () => ({
  type: 'LOAD_PRODUCTS_REQUEST',
  payload: {
    message: 'Loading Products...',
  },
});

export const loadProductsSuccess = payload => ({
  type: 'LOAD_PRODUCTS_SUCCESS',
  payload,
});

export const loadProductsFail = error => ({
  type: 'LOAD_PRODUCTS_FAIL',
  payload: {
    error,
    message: 'Load Products Failed',
    title: 'Load Products',
  },
});

export const loadProductsAction = () => async dispatch => {
  try {
    dispatch(
      loadProductsRequest({
        message: 'Loading Products...',
      }),
    );
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
};
