import React, {Component} from 'react';
import glamorous from 'glamorous';
import Page from 'modules/shared/components/page';
import Wrapper from 'modules/shared/components/wrapper';
import {generateRandomEmojis} from 'modules/emoji/helpers';
import EmojiList from 'modules/emoji/components/emojiList';
import colors, {gradients} from 'modules/shared/helpers/colors';
import {TweenMax} from 'gsap';

const PageHeader = glamorous.div({
  margin: '1rem 0',
});

const Divider = glamorous.div({
  height: 2,
  width: '100%',
  maxWidth: 300,
  backgroundImage: gradients.divider,
  margin: '1rem auto',
});

const Title = glamorous.h2({
  fontFamily: 'Abril Fatface, cursive',
  textAlign: 'center',
  fontSize: '2.5rem',
  color: colors[4].string(),
  textTransform: 'uppercase',
  margin: '1rem 0',
  lineHeight: 0.75,
});

const SubTitle = glamorous.h3({
  fontFamily: 'Open Sans, sans-serif',
  textAlign: 'center',
  fontSize: '1rem',
  color: colors[4].string(),
  lineHeight: 0.75,
});

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: [],
      in: false,
    };
  }

  componentDidMount() {
    this.setState({
      emojis: generateRandomEmojis(),
      in: true,
    });

    TweenMax.fromTo(
      this._divider,
      1.25,
      {
        alpha: 0,
        y: 10,
      },
      {
        alpha: 1,
        y: 0,
        delay: 0.65,
      },
    );

    TweenMax.fromTo(
      this._title,
      1.25,
      {
        alpha: 0,
        y: 10,
      },
      {
        alpha: 1,
        y: 0,
        delay: 1,
      },
    );

    TweenMax.fromTo(
      this._subtitle,
      1.25,
      {
        alpha: 0,
        y: 10,
      },
      {
        alpha: 1,
        y: 0,
        delay: 1.5,
      },
    );
  }

  render() {
    const {emojis} = this.state;
    const {status} = this.props.location;
    return (
      <Page bgImage={gradients.background}>
        <Wrapper>
          {emojis.length > 0 &&
            <PageHeader>
              <EmojiList emojis={emojis} animate={status === 'entered'} />
            </PageHeader>}
          <Divider innerRef={c => (this._divider = c)} />
          <Title innerRef={c => (this._title = c)}>Emojinate</Title>
          <SubTitle innerRef={c => (this._subtitle = c)}>
            Storytelling with emojis
          </SubTitle>
        </Wrapper>
      </Page>
    );
  }
}
export default Homepage;
