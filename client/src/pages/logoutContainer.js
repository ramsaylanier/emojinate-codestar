import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../state/actions/userActions';

class LogoutPage extends Component {
  componentDidMount() {
    const {user} = this.props;

    if (!user) {
    } else {
      this.props.user.signOut();
      this.props.logoutUser();
    }
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

const logoutContainer = connect(mapStateToProps, {logoutUser})(LogoutPage);

export default logoutContainer;
