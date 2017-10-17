import ddb from '../../dynamo';
import {NoTokenError} from '../../errors/noTokenError';
import {checkAuth} from '../../../client/src/auth/checkAuth';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

const USER_NAMESPACE = uuidv4();

export default (obj, args, context, info) => {
  if (!context.token) {
    throw new NoTokenError();
  }

  const {title, storyText, authorId, emojis} = args;
  const createdAt = new Date().toString();
  const id = uuidv5(`${authorId}${createdAt}`, USER_NAMESPACE);
  checkAuth(context.token).then(r => {
    return ddb.StoryDB
      .put({
        Item: {
          id: id,
          title: title,
          storyText: storyText,
          authorId: r.name,
          emojis: emojis,
          created_at: createdAt,
        },
      })
      .promise()
      .then(r => {
        return {id: id};
      })
      .catch(err => {
        return err;
      });
  });
};
