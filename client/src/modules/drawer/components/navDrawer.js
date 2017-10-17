import React, {Component} from 'react';
import glamorous from 'glamorous';
import {gradients} from 'modules/shared/helpers/colorHelpers';
import Nav from 'modules/nav/components/nav';

const Container = glamorous.div({
  position: 'fixed',
  height: '100%',
  width: '50%',
  top: 0,
  left: 0,
  backgroundImage: gradients.navDrawer,
  transform: 'translateX(-50vw)',
  zIndex: '90',
});

const Links = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Stories',
    href: '/stories',
  },
];

class NavDrawer extends Component {
  render() {
    return (
      <Container innerRef={c => (this._container = c)}>
        <Nav
          handleClick={this.props.toggleNavDrawer}
          links={Links}
          isOpen={this.props.isOpen}
        />
      </Container>
    );
  }
}

export default NavDrawer;
