import {connect} from 'react-redux';
import ProfilePage from './profile';
import {updateUser, getUserAttributes} from '../state/actions/userActions';
import {throwError} from '../state/actions/uiActions';

const mapStateToProps = state => {
  return {
    cognitoUser: state.userReducer.user,
    attributes: state.userReducer.attributes,
  };
};

const profileContainer = connect(mapStateToProps, {
  updateUser,
  getUserAttributes,
  throwError,
})(ProfilePage);

export default profileContainer;
