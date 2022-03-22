import { connect } from 'react-redux';
import ErrorAlert from './ErrorAlert';

const mapStateToProps = state => ({
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  clearError: payload =>
    dispatch({ type: 'CLEAR_ERROR', payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorAlert);
