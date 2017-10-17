import ddb from '../../dynamo';

export default function resolveStories(authorId) {
  if (authorId) {
    return getStoriesByAuthor(authorId);
  } else {
    return getAllStories();
  }
}

function getStoriesByAuthor(authorId) {
  return ddb.StoryDB
    .query({
      IndexName: 'stories_by_author',
      KeyConditionExpression: 'authorId = :authorId',
      ExpressionAttributeValues: {
        ':authorId': authorId,
      },
    })
    .promise()
    .then(data => {
      return shapeAndOrderStories(data.Items);
    })
    .catch(error => {
      console.log(error);
    });
}

function getAllStories() {
  return ddb.StoryDB
    .scan({})
    .promise()
    .then(data => {
      return shapeAndOrderStories(data.Items);
    })
    .catch(error => {
      console.log(error);
    });
}

function shapeAndOrderStories(stories) {
  const shapedStories = stories.map(item => {
    item.favorites = item.favorites ? item.favorites.values : [];
    return item;
  });

  return shapedStories.sort((a, b) => {
    let dateA = new Date(a.created_at);
    let dateB = new Date(b.created_at);
    return dateB - dateA;
  });
}
