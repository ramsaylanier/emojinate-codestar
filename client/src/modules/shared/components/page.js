import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import {TweenMax} from 'gsap';

const PageWithStyle = glamorous.div(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: '100vh',
    width: '100vw',
    paddingTop: '40px',
    zIndex: '1',
  },
  ({bgImage}) => ({
    backgroundImage: bgImage,
  }),
);

class Page extends Component {
  handleAnimate = status => {
    let from = {};
    let to = {};
    switch (status) {
      case 'entering': {
        from = {alpha: 0};
        to = {alpha: 1};
        break;
      }
      case 'exiting': {
        from = {alpha: 1};
        to = {alpha: 0};
        break;
      }

      default:
        break;
    }

    TweenMax.fromTo(this._page, 1, from, to);
  };

  render() {
    const {bgImage, children} = this.props;
    return (
      <PageWithStyle innerRef={c => (this._page = c)} bgImage={bgImage}>
        {children}
      </PageWithStyle>
    );
  }
}

Page.propTypes = {
  bgImage: PropTypes.string,
  children: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(Page);
