// import { combineReducers } from 'redux';
// import { REQUEST_NEW_COMB, RECEIVE_NEW_COMB } from '../actions/index';
//
import { combineReducers } from 'redux';
import {
  NEW_COMB, EDIT_NEW_COMB_NAME, CANCEL_NEW_COMB, POST_COMB,
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

function name(state = '', action) {
  switch(action.type) {
  case EDIT_NEW_COMB_NAME:
    return action.name;
  default:
    return state;
  }
}

function isEditing(state = false, action) {
  switch(action.type) {
  case NEW_COMB:
    return true;
  case CANCEL_NEW_COMB:
    return false;
  case POST_COMB:
    return false;
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  isEditing,
  name
});

export default rootReducer;
