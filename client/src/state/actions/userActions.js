export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER_ATTRIBUTES = 'GET_USER_ATTRIBUTES';

export function loginUser(action) {
  return {
    type: LOGIN_USER,
    user: action.user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function updateUser() {
  return {
    type: UPDATE_USER,
  };
}

export function getUserAttributes(attributes) {
  return {
    type: GET_USER_ATTRIBUTES,
    attributes: attributes,
  };
}
