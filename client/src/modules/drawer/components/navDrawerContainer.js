import {connect} from 'react-redux';
import NavDrawer from './navDrawer';
import {toggleNavDrawer} from '../../state/actions/uiActions';

const mapStateToProps = state => {
  return {
    isOpen: state.uiReducer.navDrawerOpen,
  };
};

export default connect(mapStateToProps, {toggleNavDrawer})(NavDrawer);
