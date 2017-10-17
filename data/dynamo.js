'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
AWS.config.update({region: 'us-east-1'});

const env = process.env.NODE_ENV;
const storyTableName =
  env === 'development'
    ? 'emojinate-dev-StoriesDB-17SS17HTINWNQ'
    : process.env.STORIES_TABLE;

const stories = new AWS.DynamoDB.DocumentClient({
  params: {TableName: storyTableName},
});

module.exports = {
  StoryDB: stories,
};
