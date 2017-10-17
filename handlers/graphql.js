var server = require('graphql-server-lambda');
var myGraphQLSchema = require('../data/schema/schema');

exports.graphqlHandler = function(event, context, callback) {
  console.log('EVENT: ', event);
  console.log('CONTEXT: ', context);
  const callbackFilter = function(error, output) {
    output.headers['Access-Control-Allow-Origin'] = '*';
    output.headers['Access-Control-Allow-Credentials'] = true;
    callback(error, output);
  };
  const handler = server.graphqlLambda({schema: myGraphQLSchema});
  return handler(event, context, callbackFilter);
};

exports.graphiqlHandler = server.graphiqlLambda({
  endpointURL: '/dev/graphql',
});
