import {connect} from 'react-redux';
import Snackbar from './snackbar';
import {clearSnackbar} from 'state/actions/uiActions';

const mapStateToProps = state => {
  return {
    error: state.uiReducer.error,
    alert: state.uiReducer.alert,
  };
};

export default connect(mapStateToProps, {clearSnackbar})(Snackbar);
