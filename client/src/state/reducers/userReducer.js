import {
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER_ATTRIBUTES,
} from '../actions/userActions';
import {userPool} from '../../auth/userPool';

const intitialState = {
  user: userPool.getCurrentUser(),
};

const userReducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        user: action.user,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        user: null,
      });
    case GET_USER_ATTRIBUTES:
      return Object.assign({}, state, {
        attributes: action.attributes,
      });
    default:
      return state;
  }
};

export default userReducer;
