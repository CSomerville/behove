// import { combineReducers } from 'redux';
// import { REQUEST_NEW_COMB, RECEIVE_NEW_COMB } from '../actions/index';
//
import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT } from '../actions/index';

function counter(state = 0, action) {
  switch(action.type) {
  case INCREMENT:
    return state + 1;
  case DECREMENT:
    return state - 1;
  default:
    return state;
  }
}

const app = combineReducers({
  counter
});

export default app;
