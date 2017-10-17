import React, {Component} from 'react';
import Page from 'modules/shared/components/page';
import Wrapper from 'modules/shared/components/wrapper';
import StoryList from 'modules/story/components/storyListContainer';
import StoryMenu from 'modules/story/components/storyMenuContainer';
import {gradients} from 'modules/shared/helpers/colors';

class Stories extends Component {
  handleScroll = e => {
    const {activeStory, setActiveStory} = this.props;
    if (activeStory) {
      setActiveStory(null);
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {activeStory, setActiveStory} = this.props;
    return (
      <Page bgImage={gradients.background} handleScroll={this.handleScroll}>
        <Wrapper>
          <StoryList onItemClick={setActiveStory} activeStory={activeStory} />
        </Wrapper>
      </Page>
    );
  }
}
export default Stories;
