import React, {Component} from 'react';
import glamorous from 'glamorous';
import {TweenMax, Power4} from 'gsap';
import CreateStory from 'modules/story/components/createStoryContainer';
import {gradients} from 'modules/shared/helpers/colors';

const ComponentMap = {
  createStory: <CreateStory />,
};

const Container = glamorous.div({
  position: 'fixed',
  height: '100%',
  width: '100%',
  paddingTop: '100px',
  bottom: 0,
  right: 0,
  backgroundImage: gradients.drawer,
  transform: 'translateY(100vh)',
  zIndex: '95',
});

class Drawer extends Component {
  animateDrawer = () => {
    const dY = this.props.isOpen ? 0 : window.outerHeight;
    TweenMax.to(this._container, 0.7, {
      y: dY,
      ease: Power4.easeInOut,
    });
  };

  handleCloseClick = () => {
    this.props.toggleDrawer();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.animateDrawer();
    }
  }

  render() {
    return (
      <Container innerRef={c => (this._container = c)}>
        {ComponentMap[this.props.component]}
      </Container>
    );
  }
}

export default Drawer;
