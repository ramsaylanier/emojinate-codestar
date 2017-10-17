import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import {Link} from 'react-router-dom';
import Page from 'modules/shared/components/page';
import Wrapper from 'modules/shared/components/wrapper';
import Divider from 'modules/shared/components/divider';
import colors, {gradients} from 'modules/shared/helpers/colors';
import EmojiList from 'modules/emoji/components/emojiList';
import {getEmojiOutput} from 'modules/emoji/helpers';
import moment from 'moment';

const Header = glamorous.header({
  padding: '1rem 0 0 0',
});

const Title = glamorous.h2({
  fontSize: '2.1rem',
  lineHeight: '1.1',
  color: colors[4].toString(),
  margin: 0,
  fontFamily: 'Abril Fatface',
  fontWeight: 100,
});

const Body = glamorous.div({
  margin: '1rem 0',
});

const StoryText = glamorous.div({
  background: 'rgba(255,255,255,0.9)',
  fontFamily: 'Open Sans',
  fontSize: '1.3rem',
  lineHeight: '1.5',
  padding: '1rem',
  margin: '1rem',
  borderRadius: 3,
  color: colors[4].toString(),
});

const Meta = glamorous.div({
  fontSize: '.9rem',
  display: 'flex',
  padding: '1rem 0',
  fontFamily: 'Open Sans',
  color: colors[4].toString(),
});

const MetaItem = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
});

const Author = glamorous.span({
  fontSize: '1.1rem',
  fontWeight: 900,
});

const DateText = glamorous.span({
  fontSize: '0.9rem',
});

class Story extends Component {
  formatText = () => {
    return this.props.data.story.storyText.split('\n').map((line, index) => {
      return (
        <div key={index}>
          {line}
          <br />
        </div>
      );
    });
  };

  render() {
    const {data} = this.props;

    if (data.loading) {
      return null;
    }

    const {story: {title, emojis, authorId, created_at}} = data;
    const createdAt = moment(Date.parse(created_at))
      .format('DD MMM YYYY')
      .toString();

    return (
      <Page bgImage={gradients.background}>
        <Header>
          <Wrapper>
            <Meta>
              <MetaItem>
                <Author>
                  <Link to={`/profile/${authorId}`}>
                    {authorId}
                  </Link>
                </Author>
              </MetaItem>
              <MetaItem>
                <DateText>
                  {createdAt}
                </DateText>
              </MetaItem>
            </Meta>
            <Title>
              {title}
            </Title>
          </Wrapper>
        </Header>
        <Divider />
        <Body>
          <Wrapper>
            <EmojiList emojis={getEmojiOutput(emojis)} size="full" />
          </Wrapper>
          <StoryText>
            {this.formatText()}
          </StoryText>
        </Body>
      </Page>
    );
  }
}

Story.propTypes = {
  data: PropTypes.object,
};

export default Story;
