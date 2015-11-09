import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import combsReducer from './combs';
import combReducer from './comb';

const rootReducer = combineReducers({
  router: routerStateReducer,
  combs: combsReducer,
  comb: combReducer
});

export default rootReducer;
