import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import RefreshIcon from 'modules/shared/components/icons/refresh';
import Emoji from './emoji';
import twemoji from 'twemoji';
import {map} from 'lodash';
import colors from 'modules/shared/helpers/colors';

const List = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
});

class EmojiList extends Component {
  constructor(props) {
    super(props);
    this._emoji = [];
  }

  handleRefresh = () => {
    this.props.refresh();
  };

  render() {
    const {emojis, refresh, animate, size} = this.props;
    return (
      <List>
        {refresh &&
          <button onClick={this.handleRefresh}>
            <RefreshIcon fill={colors[3].toString()} />
          </button>}
        {map(emojis, (emoji, index) => {
          const code = twemoji.convert.fromCodePoint(emoji.uc_output);
          return (
            <Emoji
              key={`${code}${index}`}
              animate={animate}
              code={code}
              index={index}
              size={size}
            />
          );
        })}
      </List>
    );
  }
}

EmojiList.propTypes = {
  refresh: PropTypes.func,
  emojis: PropTypes.array,
  animate: PropTypes.bool,
};

export default EmojiList;
