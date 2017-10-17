import React, {Component} from 'react';
import {connect} from 'react-redux';
import glamorous from 'glamorous';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Homepage from 'pages/home';
import Login from 'pages/loginContainer';
import Logout from 'pages/logoutContainer';
import Signup from 'pages/signup';
import Profile from 'pages/profileContainer';
import Stories from 'pages/storiesContainer';
import Header from 'modules/header/components/headerContainer';
import Story from 'modules/story/components/storySingleContainer';
import NewStoryButton from 'modules/button/components/newStoryButton';
import Drawer from 'modules/drawer/components/drawerContainer';
import RightDrawer from 'modules/drawer/components/rightDrawerContainer';
import Snackbar from 'modules/snackbar/components/snackbarContainer';
import {gradients} from 'modules/shared/helpers/colors';
import {TransitionGroup, Transition} from 'react-transition-group';
import {TweenMax, Power4} from 'gsap';

const Container = glamorous.div({
  position: 'absolute',
  background: gradients.background,
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
});

class App extends Component {
  renderLogout = () => {
    if (!this.props.user) {
      return <Redirect to="/" />;
    } else {
      return <Logout />;
    }
  };

  handleEnterAnimation = node => {
    if (node) {
      let fromProps = {autoAlpha: 0, scale: 1};
      let toProps = {autoAlpha: 1, scale: 1, ease: Power4.easeInOut};
      TweenMax.fromTo(node, 1.25, fromProps, toProps);
    }
  };

  handleExitAnimation = node => {
    if (node) {
      let fromProps = {autoAlpha: 1, scale: 1};
      let toProps = {autoAlpha: 0, scale: 1, ease: Power4.easeInOut};
      TweenMax.fromTo(node, 0.75, fromProps, toProps);
    }
  };

  render() {
    return (
      <Router>
        <Route
          render={({location}) =>
            <Container>
              <Header />
              <TransitionGroup>
                <Transition
                  key={location.pathname}
                  onEnter={node => this.handleEnterAnimation(node)}
                  onExit={node => this.handleExitAnimation(node)}
                  mountOnEnter={true}
                  unmountOnExit={true}
                  timeout={1000}>
                  {status => {
                    location.status = status;
                    return (
                      <Switch
                        location={location}
                        key={location.pathname}
                        status={location.status}>
                        <Route
                          exact
                          path="/"
                          component={Homepage}
                          location={location}
                        />
                        <Route
                          exact
                          path="/login"
                          component={Login}
                          location={location}
                        />
                        <Route
                          exact
                          path="/logout"
                          render={this.renderLogout}
                          location={location}
                        />
                        <Route
                          exact
                          path="/signup"
                          component={Signup}
                          location={location}
                        />
                        <Route
                          exact
                          path="/stories"
                          component={Stories}
                          location={location}
                        />
                        <Route
                          exact
                          path="/profile"
                          component={Profile}
                          location={location}
                        />
                        <Route
                          exact
                          path="/profile/:username"
                          component={Profile}
                          location={location}
                        />
                        <Route
                          exact
                          path="/story/:id"
                          component={Story}
                          location={location}
                          status={status}
                        />
                      </Switch>
                    );
                  }}
                </Transition>
              </TransitionGroup>
              <Drawer />
              <Snackbar />
              <NewStoryButton />
              <RightDrawer />
            </Container>}
        />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    navDrawerOpen: state.uiReducer.navDrawerOpen,
    rightDrawerOpen: state.uiReducer.rightDrawerOpen,
  };
};

export default connect(mapStateToProps)(App);
