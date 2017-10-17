import React, {Component} from 'react';
import glamorous from 'glamorous';
import {gradients} from 'modules/shared/helpers/colors';
import Nav from 'modules/nav/components/nav';
import {TweenMax, Power4} from 'gsap';

const Container = glamorous.div({
  position: 'fixed',
  height: '100%',
  width: 150,
  top: 0,
  right: 0,
  backgroundImage: gradients.rightDrawer,
  transform: 'translateX(50vw)',
  zIndex: '90',
});

class RightDrawer extends Component {
  handleLogout = () => {
    this.props.user.globalSignOut();
    this.props.logoutUser();
  };

  handleAnimation = () => {
    const dX = this.props.isOpen ? 0 : window.innerWidth / 2;
    TweenMax.to(this._container, 1, {
      x: dX,
      ease: Power4.easeInOut,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    this.handleAnimation();
  }

  render() {
    const {isOpen, toggleRightDrawer, user} = this.props;
    let links = [
      {
        text: 'Login',
        href: '/login',
      },
      {
        text: 'Sign Up',
        href: '/signup',
      },
    ];

    if (user) {
      links = [
        {
          text: 'Logout',
          href: '/logout',
        },
        {
          text: 'Profile',
          href: '/profile',
        },
      ];
    }

    return (
      <Container innerRef={c => (this._container = c)}>
        <Nav
          handleClick={toggleRightDrawer}
          links={links}
          animateTo={'right'}
          isOpen={isOpen}
        />
      </Container>
    );
  }
}

export default RightDrawer;
