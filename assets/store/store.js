import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import counter from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(counter);

export default store;
