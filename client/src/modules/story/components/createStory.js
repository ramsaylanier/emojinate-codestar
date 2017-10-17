import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import Wrapper from 'modules/shared/components/wrapper';
import {
  FieldControl,
  Field,
  TextArea,
} from 'modules/shared/components/form/fields';
import {generateRandomEmojis} from 'modules/emoji/helpers';
import EmojiList from 'modules/emoji/components/emojiList';

const Form = glamorous.form({
  marginTop: '2rem',
  width: '100%',
});

class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      storyText: '',
      emojis: [],
    };
  }

  handleRefresh = () => {
    this.setState({
      emojis: generateRandomEmojis(),
    });
  };

  handleTitleChange = e => {
    this.setState({
      title: e.currentTarget.value,
    });
  };

  handleStoryChange = e => {
    this.setState({
      storyText: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {title, storyText, emojis} = this.state;
    const {mutate} = this.props;
    const emojiCodes = emojis.map(emoji => emoji.uc_output);
    return mutate({
      variables: {
        title: title,
        storyText: storyText,
        emojis: emojiCodes,
      },
    })
      .then(r => {
        console.log(r);
        this.props.throwAlert('Story Created!');
      })
      .catch(err => {
        console.log(err);
        this.props.throwAlert('error');
      });
  };

  componentDidMount() {
    this.setState({
      emojis: generateRandomEmojis(),
    });
  }

  render() {
    const {emojis} = this.state;
    return (
      <Wrapper>
        {emojis.length > 0 &&
          <EmojiList
            emojis={emojis}
            animate={true}
            refresh={this.handleRefresh}
          />}
        <Form onSubmit={this.handleSubmit}>
          <FieldControl>
            <Field
              width="100%"
              type="text"
              value={this.state.title}
              placeholder="Title"
              onChange={this.handleTitleChange}
              required
            />
          </FieldControl>
          <FieldControl>
            <TextArea
              width="100%"
              value={this.state.storyText}
              onChange={this.handleStoryChange}
              required
            />
          </FieldControl>
          <FieldControl>
            <Field type="submit" value="Create" />
          </FieldControl>
        </Form>
      </Wrapper>
    );
  }
}

CreateStory.propTypes = {
  mutate: PropTypes.func,
  throwAlery: PropTypes.func,
};

export default CreateStory;
