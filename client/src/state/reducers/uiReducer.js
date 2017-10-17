import {
  TOGGLE_DRAWER,
  TOGGLE_NAV_DRAWER,
  TOGGLE_RIGHT_DRAWER,
  THROW_ERROR,
  THROW_ALERT,
  CLEAR_SNACKBAR,
} from '../actions/uiActions';
import {LOGIN_USER} from '../actions/userActions';

const intitialState = {
  drawerOpen: false,
  navDrawerOpen: false,
  rightDrawerOpen: false,
  error: null,
  alert: null,
};

const uiReducer = (state = intitialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: !state.drawerOpen,
        drawerComponent: action.component,
      });
    case TOGGLE_NAV_DRAWER:
      return Object.assign({}, state, {
        navDrawerOpen: !state.navDrawerOpen,
      });
    case TOGGLE_RIGHT_DRAWER:
      return Object.assign({}, state, {
        rightDrawerOpen: !state.rightDrawerOpen,
      });
    case LOGIN_USER:
      return Object.assign({}, state, {
        alert: 'Logged In!',
      });
    case THROW_ERROR:
      return Object.assign({}, state, {
        alery: null,
        error: action.message,
      });
    case THROW_ALERT:
      return Object.assign({}, state, {
        error: null,
        alert: action.message,
      });
    case CLEAR_SNACKBAR:
      return Object.assign({}, state, {
        error: null,
        alert: null,
      });
    default:
      return state;
  }
};

export default uiReducer;
