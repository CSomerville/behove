import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import combReducer from './combs';

const rootReducer = combineReducers({
  router: routerStateReducer,
  combs: combReducer
});

export default rootReducer;
