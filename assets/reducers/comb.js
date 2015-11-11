import {
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL, CHANGE_COL_NAME,
  CANCEL_EDIT_COL, SAVE_EDIT_COL, SAVE_EDIT_COL_SUCCESS, SAVE_EDIT_COL_FAILURE
 } from '../actions/comb_actions';

export default function(state = { id: null, name: null, cols: [], isFetching: false, msg: '' }, action) {
  let ind;
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
      ind = indexById(state.cols, action.id);

      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          Object.assign(state.cols[ind], {
            editable: true,
            prevName: state.cols[ind].name
          }),
          ...state.cols.slice(ind + 1)
        ]
      });
    case CHANGE_COL_NAME:
      ind = indexById(state.cols, action.id);
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          Object.assign(state.cols[ind], {
            name: action.name
          }),
          ...state.cols.slice(ind + 1)
        ]
      });
    case CANCEL_EDIT_COL:
      ind = indexById(state.cols, action.id);
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          Object.assign(state.cols[ind], {
            name: state.cols[ind].prevName,
            editable: false
          }),
          ...state.cols.slice(ind + 1)
        ]
      });
    case SAVE_EDIT_COL:
      ind = indexById(state.cols, action.id);
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          Object.assign(state.cols[ind], {
            editable: false,
            isFetching: true
          }),
          ...state.cols.slice(ind + 1)
        ]
      });
    case SAVE_EDIT_COL_SUCCESS:
      ind = indexById(state.cols, action.id);
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          Object.assign(state.cols[ind], {
            isFetching: false
          }),
          ...state.cols.slice(ind + 1)
        ]
      });
    case SAVE_EDIT_COL_FAILURE:
      ind = indexById(state.cols, action.id);
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          Object.assign(state.cols[ind], {
            isFetching: false
          }),
          ...state.cols.slice(ind + 1)
        ],
        msg: action.msg
      })
    default:
      return state;
  }
}

// retrieves index for array, 3nd arg is optional.
// returns false if no match. exported for testing only
export function indexById(cols, colId, cellId) {
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].id === colId) {
      if (cellId) {
        for (let j = 0; j < cols[i].cells.length; j++) {
          if (cols[i].cells[j].id === cellId) {
            return [i, j];
          }
        }
        return false;
      } else {
        return i;
      }
    }
  }
  return false;
}
