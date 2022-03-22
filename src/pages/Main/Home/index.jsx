import { connect } from 'react-redux';
import { loadCartAction } from '../../../actions/cartAction';
import { loadProductsAction } from '../../../actions/productsAction';
import Home from './Home';

const mapStateToProps = state => ({
  products: state.products,
  productsLoading: state.loading.find(
    x => x.actionType === 'LOAD_PRODUCTS',
  ),
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => loadProductsAction()(dispatch),
  loadCart: () => loadCartAction()(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
