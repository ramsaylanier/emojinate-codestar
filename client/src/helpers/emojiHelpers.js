import {emojioneList} from 'emojione';
import {sampleSize, filter} from 'lodash';

export function stripListOfFlagsAndSymbols() {
  return filter(emojioneList, emoji => {
    return emoji.category !== 'flags' && emoji.category !== 'symbols';
  });
}

export function generateRandomEmojis() {
  const list = stripListOfFlagsAndSymbols();
  return sampleSize(list, 5);
}
