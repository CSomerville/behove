// import { combineReducers } from 'redux';
// import { REQUEST_NEW_COMB, RECEIVE_NEW_COMB } from '../actions/index';
//
import { combineReducers } from 'redux';
import {
  NEW_COMB, CANCEL_NEW_COMB, POST_COMB,
  POST_COMB_SUCCESS, POST_COMB_FAILURE
} from '../actions/index';

// function counter(state = 0, action) {
//   switch(action.type) {
//   case INCREMENT:
//     return state + 1;
//   case DECREMENT:
//     return state - 1;
//   default:
//     return state;
//   }
// }

const rootReducer = combineReducers({
  counter
});

export default rootReducer;
