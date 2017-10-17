import React, {Component} from 'react';
import glamorous from 'glamorous';
import CloseIcon from 'modules/shared/components/icons/close';
import {TweenMax} from 'gsap';
import colors from 'modules/shared/helpers/colors';

const Container = glamorous.div({
  position: 'fixed',
  bottom: 0,
  zIndex: 100,
  width: '100%',
  transform: 'translateY(100px)',
});

const Inner = glamorous.div({
  width: '90%',
  maxWidth: '400px',
  backgroundColor: colors[4].string(),
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.1rem',
  fontFamily: 'Open Sans, sans-serif',
});

const Error = glamorous.div({
  padding: '.5rem',
  color: colors[4].rotate(90).lighten(3).string(),
});

const Alert = glamorous.div({
  padding: '.5rem',
  color: 'green',
});

const Button = glamorous.button({
  backgroundColor: 'transparent',
  border: 'none',
});

class Snackbar extends Component {
  renderMessage = () => {
    const {error, alert} = this.props;
    if (error) {
      return (
        <Error>
          {error}
        </Error>
      );
    } else {
      return (
        <Alert>
          {alert}
        </Alert>
      );
    }
  };

  animateContainer = () => {
    TweenMax.to(this._container, 1, {
      y: 0,
    });

    setTimeout(this.animateContainerOut, 5000);
  };

  animateContainerOut = () => {
    TweenMax.to(this._container, 1, {
      y: 100,
      onComplete: () => {
        this.props.clearSnackbar();
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {error, alert} = this.props;
    if (error || alert) {
      if (error !== prevProps.error || alert !== prevProps.alert) {
        this.animateContainer();
      }
    }
  }

  render() {
    return (
      <Container innerRef={c => (this._container = c)}>
        <Inner>
          {this.renderMessage()}
          <Button onClick={this.animateContainerOut}>
            <CloseIcon width={24} height={24} fill="white" />
          </Button>
        </Inner>
      </Container>
    );
  }
}

export default Snackbar;
