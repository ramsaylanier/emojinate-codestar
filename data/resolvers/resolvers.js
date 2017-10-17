import createStory from './story/createStory';
import favoriteStory from './story/favoriteStory';
import getStory from './story/getStory';
import getStories from './story/getStories';

const resolvers = {
  Query: {
    stories: (obj, {authorId}) => {
      return getStories(authorId);
    },
    story: (obj, {id}) => {
      return getStory(id);
    },
  },
  Mutation: {
    createStory: createStory,
    favoriteStory: favoriteStory,
  },
};

module.exports = resolvers;
