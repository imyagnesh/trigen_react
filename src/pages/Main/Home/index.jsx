import { connect } from 'react-redux';
import { loadCartRequest } from '../../../actions/cartAction';
import { loadProductsRequest } from '../../../actions/productsAction';
import Home from './Home';

const mapStateToProps = state => ({
  products: state.products,
  productsLoading: state.loading.find(
    x => x.actionType === 'LOAD_PRODUCTS',
  ),
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProductsRequest()),
  loadCart: () => dispatch(loadCartRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
