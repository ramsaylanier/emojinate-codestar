import {connect} from 'react-redux';
import Drawer from './drawer';
import {toggleDrawer} from 'state/actions/uiActions';

const mapStateToProps = state => {
  return {
    isOpen: state.uiReducer.drawerOpen,
    component: state.uiReducer.drawerComponent,
  };
};

export default connect(mapStateToProps, {toggleDrawer})(Drawer);
