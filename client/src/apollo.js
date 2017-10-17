import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {userPool} from 'auth/userPool';

const env = process.env.NODE_ENV;
const uri =
  env === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://86jmw9e1g1.execute-api.us-east-1.amazonaws.com/dev/graphql';

const networkInterface = createNetworkInterface({
  uri: uri,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err) {
            console.log(err);
          }

          // get the authentication token from local storage if it exists
          const token = session.getIdToken().getJwtToken();
          req.options.headers.Authorization = token ? `${token}` : null;
          next();
        });
      } else {
        next();
      }
    },
  },
]);

// Create the client as outlined above
const client = new ApolloClient({
  networkInterface,
});

export default client;
