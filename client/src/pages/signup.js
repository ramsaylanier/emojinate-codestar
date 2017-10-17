import React, {Component} from 'react';
import glamorous from 'glamorous';
import Page from 'modules/shared/components/page';
import Wrapper from 'modules/shared/components/wrapper';
import {FieldControl, Field} from 'modules/shared/components/form/fields';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import config from '../config.js';

const poolData = {
  UserPoolId: config.cognitoUserPoolId,
  ClientId: config.cognitoClientId,
};

const Form = glamorous.form({
  marginTop: '2rem',
  width: '100%',
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const {username, email, password, confirmPassword} = this.state;

    // TODO: User notifications
    if (password !== confirmPassword) {
      console.log('passwords dont match');
      return false;
    }

    const dataEmail = {
      Name: 'email',
      Value: email,
    };

    const dataName = {
      Name: 'name',
      Value: username,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeName = new CognitoUserAttribute(dataName);
    const attributes = [attributeEmail, attributeName];

    const userPool = new CognitoUserPool(poolData);
    userPool.signUp(username, password, attributes, null, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        const user = res.user;
        console.log(user);
      }
    });
  };

  handleUsernameChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      username: value,
    });
  };

  handleEmailChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      email: value,
    });
  };

  handlePasswordChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      password: value,
    });
  };

  handlePasswordConfirmChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      confirmPassword: value,
    });
  };

  render() {
    return (
      <Page>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <FieldControl>
              <Field
                width="100%"
                type="text"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                required
              />
            </FieldControl>
            <FieldControl>
              <Field
                width="100%"
                type="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
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
              <Field
                width="100%"
                type="password"
                placeholder="confirm password"
                value={this.state.confirmPassword}
                onChange={this.handlePasswordConfirmChange}
                required
              />
            </FieldControl>
            <FieldControl>
              <Field type="submit" value="Register" />
            </FieldControl>
          </Form>
        </Wrapper>
      </Page>
    );
  }
}

export default Signup;
