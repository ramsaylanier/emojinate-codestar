import {connect} from 'react-redux';
import RightDrawer from './rightDrawer';
import {toggleRightDrawer} from 'state/actions/uiActions';
import {logoutUser} from 'state/actions/userActions';

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    isOpen: state.uiReducer.rightDrawerOpen,
  };
};

export default connect(mapStateToProps, {toggleRightDrawer, logoutUser})(
  RightDrawer,
);
