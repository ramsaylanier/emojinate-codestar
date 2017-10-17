import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import {Link} from 'react-router-dom';
import colors, {gradients} from 'modules/shared/helpers/colors';
import EmojiList from 'modules/emoji/components/emojiList';
import FavoriteIcon from 'modules/shared/components/icons/favorite';
import FavoriteOutlineIcon from 'modules/shared/components/icons/favorite-outline';
import moment from 'moment';

const ListItem = glamorous.div({
  borderImage: gradients.divider,
  borderImageSlice: 1,
  borderWidth: '1px 1px 1px 1px',
  borderStyle: 'solid',
  marginBottom: '2.5%',
});

const ListItemHeader = glamorous.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
});

const Meta = glamorous.div({
  fontSize: '.9rem',
  display: 'flex',
  fontFamily: 'Open Sans',
});

const MetaItem = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  color: colors[4].toString(),
  lineHeight: 0,
  padding: '.25rem 0.5rem',
  '&:not(:last-of-type)': {
    borderRight: '1px solid black',
  },
});

const Author = glamorous.span({
  fontWeight: 900,
  '& a': {
    color: colors[3].toString(),
  },
});

const DateText = glamorous.span({
  fontWeight: 100,
});

const Body = glamorous.div({
  marginTop: '1rem',
  fontFamily: 'Open Sans',
  backgroundColor: 'rgba(255,255,255,0.50)',
  padding: '1.5rem',
});

const BodyText = glamorous.div({});

const Footer = glamorous.div({
  padding: '.5rem',
});

const ActionButton = glamorous.div({
  height: 25,
  width: 25,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

class StoryListItem extends Component {
  handleClick = e => {
    const node = e.target;
    if (node.tagName === 'DIV') {
      const {id, history} = this.props;
      history.push({
        pathname: `/story/${id}`,
      });
    }
  };

  handleFavoriteClick = e => {
    const {mutate, user, id, favorites} = this.props;
    const {username} = user;

    return mutate({
      variables: {
        storyId: id,
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

  formatText = () => {
    return this.props.storyText.split('\n').map((line, index) => {
      return (
        <div key={index}>
          {line}
          <br />
        </div>
      );
    });
  };

  render() {
    const {
      user,
      emojis,
      authorId,
      created_at,
      favorites,
      onClick,
      isActive,
    } = this.props;
    const createdAt = moment(Date.parse(created_at)).fromNow(true);
    const isFavorited = favorites.indexOf(user.username) >= 0;

    return (
      <ListItem onClick={this.handleClick} isActive={isActive}>
        <ListItemHeader>
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

            {favorites &&
              <MetaItem>
                <FavoriteIcon
                  height={15}
                  width={15}
                  fill={colors[3].toString()}
                />
                <DateText>
                  {favorites.length}
                </DateText>
              </MetaItem>}
          </Meta>
        </ListItemHeader>
        <EmojiList
          emojis={emojis.map(emoji => ({
            uc_output: emoji,
          }))}
        />
        <Body>
          <BodyText>
            {this.formatText()}
          </BodyText>
        </Body>
        <Footer>
          <ActionButton onClick={this.handleFavoriteClick}>
            {isFavorited
              ? <FavoriteIcon
                  height={20}
                  width={20}
                  fill={colors[3].toString()}
                />
              : <FavoriteOutlineIcon
                  height={20}
                  width={20}
                  fill={colors[3].toString()}
                />}
          </ActionButton>
        </Footer>
      </ListItem>
    );
  }
}

StoryListItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  storyText: PropTypes.string,
  authorId: PropTypes.string,
  emojis: PropTypes.array,
  created_at: PropTypes.string,
  history: PropTypes.object,
};

export default StoryListItem;
