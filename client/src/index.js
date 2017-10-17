import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import store from './state/store';
import client from './apollo';

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
