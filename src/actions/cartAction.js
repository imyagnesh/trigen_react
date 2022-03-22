import axiosInstance from '../utils/axiosInstance';

export const loadCartRequest = () => ({
  type: 'LOAD_CART_REQUEST',
  payload: {
    message: 'Loading Cart...',
  },
});

export const loadCartSuccess = payload => ({
  type: 'LOAD_CART_SUCCESS',
  payload,
});

export const loadCartFail = error => ({
  type: 'LOAD_CART_FAIL',
  payload: {
    error,
    message: 'Load Cart Failed',
    title: 'Load Cart',
  },
});

export const addCartRequest = product => ({
  type: 'ADD_CART_REQUEST',
  payload: {
    loaderId: product.id,
    message: 'Adding Item To cart...',
  },
});

export const addCartSuccess = cartItem => ({
  type: 'ADD_CART_SUCCESS',
  payload: { ...cartItem, loaderId: cartItem.productId },
});

export const addCartFail = (error, loaderId) => ({
  type: 'ADD_CART_FAIL',
  payload: {
    error,
    loaderId,
    message: 'Add Cart Item Failed',
    title: 'Add Cart',
  },
});

export const UpdateCartRequest = cartItem => ({
  type: 'UPDATE_CART_REQUEST',
  payload: {
    message: 'Updating Cart Item',
    loaderId: cartItem.productId,
  },
  cartItem,
});

export const UpdateCartSuccess = cartItem => ({
  type: 'UPDATE_CART_SUCCESS',
  payload: {
    ...cartItem,
    loaderId: cartItem.productId,
  },
});

export const UpdateCartFail = (error, cartItem) => ({
  type: 'UPDATE_CART_FAIL',
  payload: {
    error,
    loaderId: cartItem.productId,
    message: 'Update Cart Item Failed',
    title: 'Update Cart',
  },
});

export const DeleteCartRequest = cartItem => ({
  type: 'DELETE_CART_REQUEST',
  payload: {
    message: 'Delete Cart Item',
    loaderId: cartItem.productId,
  },
});

export const DeleteCartSuccess = cartItem => ({
  type: 'DELETE_CART_SUCCESS',
  payload: {
    ...cartItem,
    loaderId: cartItem.productId,
  },
  cartItem,
});

export const DeleteCartFail = (error, cartItem) => ({
  type: 'DELETE_CART_FAIL',
  payload: {
    error,
    loaderId: cartItem.productId,
    message: 'Delete Cart Item Failed',
    title: 'Delete Cart',
  },
});

export const loadCartAction = () => async dispatch => {
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
};

export const addToCartAction =
  product => async dispatch => {
    try {
      dispatch(addCartRequest(product));
      const res = await axiosInstance.post('660/cart', {
        quantity: 1,
        productId: product.id,
      });
      dispatch(addCartSuccess(res.data));
    } catch (error) {
      dispatch(addCartFail(error, product.id));
    }
  };

export const updateQuantityAction =
  cartItem => async dispatch => {
    try {
      dispatch(UpdateCartRequest(cartItem));
      const res = await axiosInstance.put(
        `660/cart/${cartItem.id}`,
        cartItem,
      );
      dispatch(UpdateCartSuccess(res.data));
    } catch (error) {
      dispatch(UpdateCartFail(error, cartItem));
    }
  };

export const deleteCartItemAction =
  cartItem => async dispatch => {
    try {
      dispatch(DeleteCartRequest(cartItem));
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
      dispatch(DeleteCartSuccess(cartItem));
    } catch (error) {
      dispatch(DeleteCartFail(error, cartItem));
    }
  };
