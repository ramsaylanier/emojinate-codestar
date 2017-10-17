import React, {Component} from 'react';
import glamorous from 'glamorous';
import Page from 'modules/shared/components/page';
import Wrapper from 'modules/shared/components/wrapper';
import {FieldControl, Field} from 'modules/shared/components/form/fields';
import AWS from 'aws-sdk';
import config from 'config.js';
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {Redirect} from 'react-router-dom';
import {userPool} from 'auth/userPool';
import {gradients} from 'modules/shared/helpers/colors';

const Form = glamorous.form({
  marginTop: '2rem',
  width: '100%',
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: '',
      password: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const {username, password} = this.state;
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser({Username: username, Pool: userPool});
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: res => {
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.identityPoolId, // your identity pool id here
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_puwZ9vSlK': res
              .getIdToken()
              .getJwtToken(),
          },
        });
        // call refresh method in order to authenticate user and get new temp credentials
        AWS.config.credentials.refresh(error => {
          if (error) {
            console.error(error);
          } else {
            console.log('Successfully logged!');
          }
        });

        this.props.loginUser({user: cognitoUser});
        this.setState({
          redirect: true,
        });
      },
      onFailure: err => {
        this.props.throwError(err.message);
      },
    });
  };

  handleUsernameChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      username: value,
    });
  };

  handlePasswordChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      password: value,
    });
  };

  render() {
    const {from} = this.props.location.state || {from: {pathname: '/'}};

    if (this.state.redirect || this.props.user) {
      return <Redirect to={from} />;
    }

    return (
      <Page bgImage={gradients.background}>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <FieldControl>
              <Field
                width="100%"
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.handleUsernameChange}
                required
              />
            </FieldControl>
            <FieldControl>
              <Field
                width="100%"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                required
              />
            </FieldControl>
            <FieldControl>
              <Field type="submit" value="Login" />
            </FieldControl>
          </Form>
        </Wrapper>
      </Page>
    );
  }
}

export default Login;
