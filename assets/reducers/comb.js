import { FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE } from '../actions/comb_actions';

export default function(state = { id: null, name: null, cols: [], isFetching: false, msg: '' }, action) {
  switch(action.type) {
    case FETCH_COMB:
      return Object.assign({}, state, {
        id: action.id,
        isFetching: true
      });
    case FETCH_COMB_SUCCESS:
      return Object.assign({}, state, {
        cols: action.comb.cols,
        name: action.comb.name,
        isFetching: false
      });
    case FETCH_COMB_FAILURE:
      return Object.assign({}, state, {
        msg: action.msg,
        isFetching: false
      });
    default:
      return state;
  }
}
