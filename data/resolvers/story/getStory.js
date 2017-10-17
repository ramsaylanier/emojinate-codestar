import ddb from '../../dynamo';

export default storyId => {
  return ddb.StoryDB
    .get({
      Key: {
        id: storyId,
      },
    })
    .promise()
    .then(data => {
      const {Item} = data;
      Item.favorites = Item.favorites ? Item.favorites.values : [];
      return Item;
    })
    .catch(err => {
      console.log(err);
    });
};
