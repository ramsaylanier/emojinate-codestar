import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import glamorous from 'glamorous';
import Wrapper from 'modules/shared/components/wrapper';
import IconButton from 'modules/button/components/iconButton';
import HomeIcon from 'modules/shared/components/icons/home';
import ProfileIcon from 'modules/shared/components/icons/profile';
import colors from 'modules/shared/helpers/colors';

const Container = glamorous.header({
  position: 'fixed',
  width: '100%',
  height: 40,
  left: 0,
  top: 0,
  backgroundColor: colors[4].string(),
  padding: '.5rem 0',
  zIndex: '100',
});

const NavWrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between',
});

class Header extends Component {
  render() {
    const {toggleRightDrawer} = this.props;

    const handleProfileClick = e => {
      toggleRightDrawer();
    };

    return (
      <Container>
        <Wrapper>
          <NavWrapper>
            <Link to="/stories">
              <HomeIcon fill="white" />
            </Link>

            <IconButton
              onClick={handleProfileClick}
              icon={<ProfileIcon fill="white" />}
            />
          </NavWrapper>
        </Wrapper>
      </Container>
    );
  }
}

Header.propTypes = {
  toggleRightDrawer: PropTypes.func,
};

export default Header;
