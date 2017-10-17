import {emojioneList} from 'emojione';
import {sampleSize, filter} from 'lodash';

export const getEmojiOutput = emojis => {
  return emojis.map(emoji => ({uc_output: emoji}));
};

export function stripListOfFlagsAndSymbols() {
  return filter(emojioneList, emoji => {
    return emoji.category !== 'flags' && emoji.category !== 'symbols';
  });
}

export function generateRandomEmojis() {
  const list = stripListOfFlagsAndSymbols();
  return sampleSize(list, 5);
}
