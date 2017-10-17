import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import twemoji from 'twemoji';
import {TweenMax} from 'gsap';

const Container = glamorous.div(
  {
    maxWidth: 50,
    maxHeight: 50,
    padding: '0.1em',
    '& img': {
      borderRadius: 2,
      backgroundColor: 'white',
      padding: '0.35em',
      width: '100%',
    },
  },
  ({size}) => ({
    width: size === 'full' ? '20%' : 50,
    height: size === 'full' ? '20%' : 50,
  }),
);

class Emoji extends Component {
  animateIn = () => {
    TweenMax.fromTo(
      this._emoji,
      0.5,
      {
        alpha: 0,
        y: 10,
      },
      {
        alpha: 1,
        y: 0,
        delay: this.props.index / 10,
      },
    );
  };

  componentDidMount() {
    this.animateIn();
  }

  render() {
    const {code, size = 45} = this.props;
    return (
      <Container
        size={size}
        innerRef={c => (this._emoji = c)}
        dangerouslySetInnerHTML={{__html: twemoji.parse(code)}}
      />
    );
  }
}

Emoji.propTypes = {
  code: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  size: PropTypes.string,
};

export default Emoji;
