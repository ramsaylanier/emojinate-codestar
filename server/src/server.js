import express from 'express';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {formatError} from 'apollo-errors';
import bodyParser from 'body-parser';
import graphQLSchema from '../../data/schema/schema';
import cors from 'cors';

const PORT = 4000;
const app = express();
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// prettier-ignore
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(request => {
    return ({
      schema: graphQLSchema,
      context: {token: request.headers.authorization},
      formatError,
    })
  })
);

// prettier-ignore
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

app.listen(PORT);
