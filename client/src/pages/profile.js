import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Redirect} from 'react-router-dom';
import glamorous from 'glamorous';
import Page from 'modules/shared/components/page';
import {FieldControl, Field} from 'modules/shared/components/form/fields';
import Wrapper from 'modules/shared/components/wrapper';
import colors, {gradients} from 'modules/shared/helpers/colors';
import {map} from 'lodash';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import EmailIcon from 'modules/shared/components/icons/email';
import ProfileIcon from 'modules/shared/components/icons/profile';
import StoryList from 'modules/story/components/storyListContainer';
import {userPool} from 'auth/userPool';

const PageHeader = glamorous.div({
  margin: '1rem 0 2rem 0',
});

const Divider = glamorous.div({
  height: 2,
  width: '100%',
  maxWidth: 300,
  backgroundImage: gradients.divider,
  margin: '1rem auto',
});

const Attribute = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  padding: '.25rem 0',
  fontFamily: 'Open Sans, sans-serif',
  fontWeight: 400,
  color: colors[3].string(),
  '& svg': {
    marginRight: '1rem',
    fill: colors[3].string(),
  },
});

const Form = glamorous.form({
  marginTop: '2rem',
  width: '100%',
});

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleEmailChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      email: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const attributeList = [];
    const email = {
      Name: 'email',
      Value: this.state.email,
    };

    var emailAttribute = new CognitoUserAttribute(email);
    attributeList.push(emailAttribute);

    this.props.cognitoUser.updateAttributes(attributeList, function(
      err,
      result,
    ) {
      if (err) {
        alert(err);
      }
    });
  };

  componentDidMount() {
    const {getUserAttributes, match} = this.props;
    const currentUser = userPool.getCurrentUser();
    const usernameForProfile = match.params.username;

    if (!currentUser) {
      return null;
    }

    if (usernameForProfile && usernameForProfile !== currentUser.username) {
      const attributes = {
        username: usernameForProfile,
      };

      getUserAttributes(attributes);
      // currentUser.getSession((err, session) => {
      //   if (session) {
      //     AWS.config.region = 'us-east-1';
      //     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      //       IdentityPoolId: config.identityPoolId, // your identity pool id here
      //       Logins: {
      //         'cognito-idp.us-east-1.amazonaws.com/us-east-1_puwZ9vSlK': session
      //           .getIdToken()
      //           .getJwtToken(),
      //       },
      //     });
      //     AWS.config.credentials.refresh(err => {
      //       console.log(err);
      //     });
      //     const awsSP = new AWS.CognitoIdentityServiceProvider();
      //
      //     const params = {
      //       UserPoolId: config.cognitoUserPoolId,
      //       AttributesToGet: ['name'],
      //       Filter: 'username = "test"',
      //     };
      //     awsSP.listUsers(params, (err, res) => {
      //       const attributes = {};
      //       console.log(res.Users[0]);
      //       // map(res.Users[0].Attributes, attribute => {
      //       //   console.log(attribute);
      //       //   attributes[attribute.getName()] = attribute.getValue();
      //       // });
      //       // getUserAttributes(attributes);
      //     });
      //   }
      // });
    } else {
      currentUser.getSession((err, res) => {
        if (err) {
          console.log(err);
        } else {
          return currentUser.getUserAttributes((err, res) => {
            if (err) {
              return;
            }

            const attributes = {};
            map(res, attribute => {
              attributes[attribute.getName()] = attribute.getValue();
            });

            this.setState({
              email: attributes.email,
            });

            getUserAttributes(attributes);
          });
        }
      });
    }
  }

  render() {
    const {cognitoUser, attributes} = this.props;

    if (!cognitoUser) {
      return <Redirect to="/" />;
    }

    const authorId = this.props.match.params.username || cognitoUser.username;

    return (
      <Page bgImage={gradients.background}>
        <Wrapper>
          {attributes &&
            <PageHeader>
              {attributes.username &&
                <Attribute>
                  <ProfileIcon />
                  {attributes.username}
                </Attribute>}
              {attributes.email &&
                <Attribute>
                  <EmailIcon />
                  {attributes.email}
                </Attribute>}
            </PageHeader>}
          <Divider innerRef={c => (this._divider = c)} />

          {false &&
            <Form onSubmit={this.handleSubmit}>
              <FieldControl>
                <Field
                  width="100%"
                  type="text"
                  value={this.state.email}
                  placeholder={attributes.email}
                  onChange={this.handleEmailChange}
                  required
                />
              </FieldControl>
              <FieldControl>
                <Field type="submit" value="Update" />
              </FieldControl>
            </Form>}
        </Wrapper>

        <Wrapper>
          <StoryList authorId={authorId} />
        </Wrapper>
      </Page>
    );
  }
}

Homepage.propTypes = {
  cognitoUser: PropTypes.object,
  attributes: PropTypes.object,
  getUserAttributes: PropTypes.func,
  match: PropTypes.object,
};

export default Homepage;
