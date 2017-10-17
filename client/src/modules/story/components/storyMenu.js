import React, {Component} from 'react';
import glamorous from 'glamorous';
import colors from 'modules/shared/helpers/colors';
import FavoriteIcon from 'modules/shared/components/icons/favorite';
import FaceIcon from 'modules/shared/components/icons/face';
import {TweenMax, Power4} from 'gsap';

const WIDTH = 60;
const OFFSET = 10;

const Container = glamorous.div({
  position: 'fixed',
  top: 0,
  right: -WIDTH - OFFSET,
  width: WIDTH,
  height: '100%',
  backgroundColor: colors[3].toString(),
  boxShadow: `0px 0px 30px -3px ${colors[4].toString()}`,
});

const ActionList = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  flexFlow: 'column',
  height: '100%',
  paddingTop: '5rem',
});

const Action = glamorous.button({});

class StoryMenu extends Component {
  handleAnimation = () => {
    const dX = this.props.story ? -WIDTH - OFFSET : 0;
    TweenMax.to(this._container, 0.5, {
      x: dX,
      ease: Power4.easeInOut,
    });
  };

  handleFavoriteClick = () => {
    const {mutate, story, user} = this.props;
    const {username} = user;
    const {favorites} = story;

    return mutate({
      variables: {
        storyId: story.id,
        favorite: favorites.indexOf(username) === -1,
      },
    })
      .then(r => {
        console.log(r);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    this.handleAnimation();
  }

  render() {
    return (
      <Container
        innerRef={c => {
          this._container = c;
        }}>
        <ActionList>
          <Action onClick={this.handleFavoriteClick}>
            <FavoriteIcon />
          </Action>
          <Action>
            <FaceIcon />
          </Action>
        </ActionList>
      </Container>
    );
  }
}

export default StoryMenu;
