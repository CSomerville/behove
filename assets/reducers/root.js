import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import combsReducer from './combs';
import combReducer from './comb';
import cellReducer from './cell';

const rootReducer = combineReducers({
  router: routerStateReducer,
  combs: combsReducer,
  comb: combReducer,
  cell: cellReducer
});

export default rootReducer;
