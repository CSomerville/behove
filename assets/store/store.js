import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import { createHistory } from 'history';
import rootReducer from '../reducers/root';

const createStoreWithMiddleware = compose(applyMiddleware(
  thunkMiddleware
), (reduxReactRouter({ createHistory })))(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
