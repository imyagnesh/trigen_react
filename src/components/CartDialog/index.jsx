import { connect } from 'react-redux';
import { deleteCartItemAction } from '../../actions/cartAction';
import CartDialog from './CartDialog';

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  deleteCartItem: cartItem =>
    deleteCartItemAction(cartItem)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartDialog);
