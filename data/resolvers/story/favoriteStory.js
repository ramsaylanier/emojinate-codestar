import ddb from '../../dynamo';
import {NoTokenError} from '../../errors/noTokenError';
import {checkAuth} from '../../../client/src/auth/checkAuth';
import getStory from './getStory';

export default (obj, {storyId, favorite}, {token}, info) => {
  if (!token) {
    throw new NoTokenError();
  }

  return checkAuth(token).then(r => {
    let updateExpression = 'add favorites :authorId';
    if (!favorite) {
      updateExpression = 'delete favorites :authorId';
    }

    return ddb.StoryDB
      .update({
        Key: {
          id: storyId,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: {
          ':authorId': ddb.StoryDB.createSet([r.name]),
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise()
      .then(r => {
        return getStory(storyId);
      });
  });
};
