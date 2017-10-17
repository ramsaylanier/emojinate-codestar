import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import storyReducer from './reducers/storyReducer';
import client from '../apollo';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({
  userReducer,
  uiReducer,
  storyReducer,
  apollo: client.reducer(),
});

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(client.middleware())),
);

export default store;
