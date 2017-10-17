import {connect} from 'react-redux';
import Header from './header';
import {loginUser, logoutUser} from 'state/actions/userActions';
import {toggleNavDrawer, toggleRightDrawer} from 'state/actions/uiActions';

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    navDrawerOpen: state.uiReducer.navDrawerOpen,
  };
};

const HeaderContainer = connect(mapStateToProps, {
  loginUser,
  logoutUser,
  toggleNavDrawer,
  toggleRightDrawer,
})(Header);

export default HeaderContainer;
