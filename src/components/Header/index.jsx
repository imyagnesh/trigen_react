import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = state => ({
  isLoading: state.loading.some(x =>
    [
      'LOAD_CART',
      'ADD_CART',
      'UPDATE_CART',
      'DELETE_CART',
    ].includes(x.actionType),
  ),
  cartCount: state.cart.reduce((p, c) => p + c.quantity, 0),
});

export default connect(mapStateToProps)(Header);
