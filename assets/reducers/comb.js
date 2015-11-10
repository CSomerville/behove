import { FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL
 } from '../actions/comb_actions';

export default function(state = { id: null, name: null, cols: [], isFetching: false, msg: '' }, action) {
  switch(action.type) {
    case FETCH_COMB:
      return Object.assign({}, state, {
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
    case UPDATE_COMB_ID:
      return Object.assign({}, state, {
        id: action.id
      });
    case EDIT_COL:
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, action.ind),
          Object.assign(state.cols[action.ind], {
            editable: true,
            prevName: state.cols[action.ind].name
          }),
          ...state.cols.slice(action.ind + 1)
        ]
      });
    default:
      return state;
  }
}
