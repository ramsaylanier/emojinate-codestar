export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_NAV_DRAWER = 'TOGGLE_NAV_DRAWER';
export const TOGGLE_RIGHT_DRAWER = 'TOGGLE_RIGHT_DRAWER';
export const THROW_ERROR = 'THROW_ERROR';
export const THROW_ALERT = 'THROW_ALERT';
export const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR';

export function toggleDrawer(component) {
  return {
    type: TOGGLE_DRAWER,
    component: component,
  };
}

export function toggleNavDrawer() {
  return {
    type: TOGGLE_NAV_DRAWER,
  };
}

export function toggleRightDrawer() {
  return {
    type: TOGGLE_RIGHT_DRAWER,
  };
}

export function throwError(message) {
  return {
    type: THROW_ERROR,
    message: message,
  };
}

export function throwAlert(message) {
  return {
    type: THROW_ALERT,
    message: message,
  };
}

export function clearSnackbar() {
  return {
    type: CLEAR_SNACKBAR,
  };
}
