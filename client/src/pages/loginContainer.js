import {connect} from 'react-redux';
import LoginPage from './login';
import {loginUser} from '../state/actions/userActions';
import {throwError} from '../state/actions/uiActions';

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

const loginContainer = connect(mapStateToProps, {loginUser, throwError})(
  LoginPage,
);

export default loginContainer;
