import React from 'react';
import {connect} from 'react-redux';
import glamorous from 'glamorous';
import AddIcon from 'modules/shared/components/icons/add';
import {toggleDrawer} from 'state/actions/uiActions';
import {TweenMax, Power4} from 'gsap';
import colors from 'modules/shared/helpers/colors';

const Container = glamorous.div({
  position: 'fixed',
  bottom: '5px',
  right: '5px',
  zIndex: 200,
});

const Button = glamorous.button({
  height: '40px',
  width: '40px',
  padding: 0,
  backgroundColor: 'white',
  borderRadius: '50%',
  border: 'none',
});

const NewStoryButton = ({drawerOpen, toggleDrawer}) => {
  const handleClick = () => {
    toggleDrawer('createStory');
  };

  const dY = drawerOpen ? -window.innerHeight + 100 : 0;
  const dR = drawerOpen ? 45 : 0;

  if (this._container) {
    TweenMax.to(this._container, 0.7, {
      y: dY,
      rotation: dR,
      ease: Power4.easeInOut,
    });
  }

  return (
    <Container innerRef={c => (this._container = c)}>
      <Button onClick={handleClick}>
        <AddIcon height={40} width={40} fill={colors[3].string()} />
      </Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    drawerOpen: state.uiReducer.drawerOpen,
  };
};

export default connect(mapStateToProps, {toggleDrawer})(NewStoryButton);
