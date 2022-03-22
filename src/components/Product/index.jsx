import { connect } from 'react-redux';
import {
  addToCartAction,
  deleteCartItemAction,
  updateQuantityAction,
} from '../../actions/cartAction';
import Product from './Product';

const mapStateToProps = (state, { product }) => ({
  cartItem: state.cart.find(
    x => x.productId === product.id,
  ),
  isAdding: state.loading.some(
    x =>
      x.loaderId === product.id &&
      x.actionType === 'ADD_CART',
  ),
  isUpdating: state.loading.some(
    x =>
      x.loaderId === product.id &&
      x.actionType === 'UPDATE_CART',
  ),
  isDeleting: state.loading.some(
    x =>
      x.loaderId === product.id &&
      x.actionType === 'DELETE_CART',
  ),
});

const mapDispatchToProps = dispatch => ({
  addToCart: product => addToCartAction(product)(dispatch),
  updateQuantity: cartItem =>
    updateQuantityAction(cartItem)(dispatch),
  deleteCartItem: cartItem =>
    deleteCartItemAction(cartItem)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);
