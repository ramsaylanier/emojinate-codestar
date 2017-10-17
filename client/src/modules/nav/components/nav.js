import React, {Component} from 'react';
import glamorous from 'glamorous';
import {Link} from 'react-router-dom';
import {gradients} from 'modules/shared/helpers/colors';
import {TweenMax, Power4} from 'gsap';

const Container = glamorous.nav({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  marginTop: '50px',
});

const NavItem = glamorous.div(
  {
    width: '90%',
    textAlign: 'center',
    padding: '1rem 0',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '1.3rem',
    },
  },
  props => ({
    backgroundImage:
      props.animateTo === 'right' ? gradients.navItemRight : gradients.navItem,
  }),
);

class Nav extends Component {
  constructor(props) {
    super(props);
    this._links = new Map();
  }

  animateNavItems = () => {
    const {isOpen, animateTo} = this.props;
    const dX = isOpen ? 0 : 100;
    const direction = animateTo === 'right' ? 1 : -1;
    const delay = isOpen ? 0.05 : -0.05;
    const duration = isOpen ? 1 : 1;
    const links = Array.from(this._links.values());
    TweenMax.staggerTo(
      links,
      duration,
      {
        x: dX * direction,
        ease: Power4.easeInOut,
      },
      delay,
    );
  };

  componentDidUpdate(prevProps, prevState) {
    this.animateNavItems();
  }

  render() {
    const {links, animateTo, handleClick} = this.props;
    return (
      <Container>
        {links.map((link, index) => {
          return (
            <NavItem
              animateTo={animateTo}
              key={link.text}
              innerRef={c => this._links.set(index, c)}>
              <Link to={link.href} onClick={handleClick}>
                {link.text}
              </Link>
            </NavItem>
          );
        })}
      </Container>
    );
  }
}

export default Nav;
