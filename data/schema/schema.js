const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('../resolvers/resolvers.js');

const typeDefs = `
  type Story {
    id: String!
    authorId: String!
    title: String!
    storyText: String!
    emojis: [String]
    created_at: String,
    favorites: [String]
  }

  type Query {
    stories(authorId: String): [Story]
    story(id: String!): Story
  }

  type Mutation {
    createStory(title: String!, storyText: String!, emojis: [String]): Story
    favoriteStory(storyId: String!, favorite: Boolean!): Story
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
