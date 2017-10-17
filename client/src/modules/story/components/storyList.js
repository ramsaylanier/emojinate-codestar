import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import StoryListItem from './storyListItemContainer';

const Container = glamorous.div({
  position: 'relative',
  margin: '2rem 0',
});

class StoryList extends Component {
  render() {
    const {data, location, history, onItemClick, activeStory} = this.props;
    if (data.loading) {
      return null;
    }
    return (
      <Container onScroll={this.handleScroll}>
        {data.stories &&
          data.stories.map(story => {
            return (
              <StoryListItem
                {...story}
                key={story.id}
                location={location}
                history={history}
                onClick={() => onItemClick(story)}
                isActive={story === activeStory}
              />
            );
          })}
      </Container>
    );
  }
}

StoryList.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default StoryList;
