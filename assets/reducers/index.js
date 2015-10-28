// import { combineReducers } from 'redux';
// import { REQUEST_NEW_COMB, RECEIVE_NEW_COMB } from '../actions/index';
//
import { combineReducers } from 'redux';
import {
  NEW_COMB, EDIT_COMB, EDIT_NEW_COMB_NAME, SAVE_EDIT_COMB, SAVE_EDIT_COMB_SUCCESS,
  SAVE_EDIT_COMB_FAILURE, FETCH_COMBS, FETCH_COMBS_SUCCESS, FETCH_COMBS_FAILURE
} from '../actions/index';

function combs(state = { combs: [], isFetching: false, msg: '' }, action) {
  switch(action.type) {
  case FETCH_COMBS:
    return Object.assign({}, state, { isFetching: true });
  case FETCH_COMBS_SUCCESS:
    return Object.assign({}, state, { combs: action.combs });
  case FETCH_COMBS_FAILURE:
    return Object.assign({}, state, { msg: action.msg });
  default:
    return state;
  }
}

// function name(state = '', action) {
//   switch(action.type) {
//   case EDIT_NEW_COMB_NAME:
//     return action.name;
//   default:
//     return state;
//   }
// }
//
// function isEditing(state = false, action) {
//   switch(action.type) {
//   case NEW_COMB:
//     return true;
//   case CANCEL_NEW_COMB:
//     return false;
//   case POST_COMB:
//     return false;
//   default:
//     return state;
//   }
// }

const rootReducer = combineReducers({
  combs
});

export default rootReducer;
