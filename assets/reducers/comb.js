import {
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL, CHANGE_COL_NAME,
  CANCEL_EDIT_COL, SAVE_EDIT_COL, SAVE_EDIT_COL_SUCCESS, SAVE_EDIT_COL_FAILURE, DELETE_COL,
  DELETE_COL_SUCCESS, DELETE_COL_FAILURE, NEW_COL, REORDER_COLS, UPDATE_COL_POS, SAVE_COL_POSES,
  SAVE_COL_POSES_SUCCESS, SAVE_COL_POSES_FAILURE, REORDER_CELLS
 } from '../actions/comb_actions';

export default function(state = { id: null, name: null, cols: [], isFetching: false, msg: '' }, action) {
  let ind;
  switch(action.type) {
    case FETCH_COMB:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_COMB_SUCCESS:
      const sorted = sortByPosition(action.comb.cols.slice());
      return Object.assign({}, state, {
        cols: sorted,
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
      });
    case DELETE_COL:
      ind = indexById(state.cols, action.id);
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, ind),
          ...state.cols.slice(ind + 1)
        ],
        isFetching: true
      });
    case DELETE_COL_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case DELETE_COL_FAILURE:
      return Object.assign({}, state, { isFetching: false, msg: action.msg });
    case NEW_COL:
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(),
          Object.assign({}, action.col, {position: state.cols.length})
        ]
      });
    case REORDER_COLS:
      let [ind1, ind2] = [ indexById(state.cols, action.sourceId), indexById(state.cols, action.targetId) ];
      if (ind1 < ind2) {
        return Object.assign({}, state, {
          cols: [
            ...state.cols.slice(0, ind1),
            ...state.cols.slice(ind1 + 1, ind2 + 1),
            state.cols[ind1],
            ...state.cols.slice(ind2 + 1)
          ]
        });
      } else if (ind1 > ind2) {
        return Object.assign({}, state, {
          cols: [
            ...state.cols.slice(0, ind2),
            state.cols[ind1],
            ...state.cols.slice(ind2, ind1),
            ...state.cols.slice(ind1 + 1)
          ]
        });
      } else {
        return state;
      }
    case UPDATE_COL_POS:
      return Object.assign({}, state, {
        cols: [
          ...state.cols.slice(0, action.ind),
          Object.assign({}, state.cols[action.ind], {position: action.ind}),
          ...state.cols.slice(action.ind + 1)
        ]
      });
    case SAVE_COL_POSES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SAVE_COL_POSES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case SAVE_COL_POSES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        msg: action.msg
      });
    case REORDER_CELLS:
      const [sourceColInd, sourceInd] = indexById(state.cols, action.sourceColId, action.sourceId);
      const [targetColInd, targetInd] = indexById(state.cols, action.targetColId, action.targetId);
      if (sourceColInd < targetColInd) {
        return Object.assign({}, state, {
          cols: [
            ...state.cols.slice(0, sourceColInd),
            Object.assign({}, state.cols[sourceColInd], { cells: [
              ...state.cols[sourceColInd].cells.slice(0, sourceInd),
              ...state.cols[sourceColInd].cells.slice(sourceInd + 1)
            ]}),
            ...state.cols.slice(sourceColInd + 1, targetColInd),
            Object.assign({}, state.cols[targetColInd], { cells: [
              ...state.cols[targetColInd].cells.slice(0, targetInd),
              state.cols[sourceColInd].cells[sourceInd],
              ...state.cols[targetColInd].cells.slice(targetInd)
            ]}),
            ...state.cols.slice(targetColInd + 1)
          ]
        });
      } else if (targetColInd < sourceColInd) {
        return Object.assign({}, state, {
          cols: [
            ...state.cols.slice(0, targetColInd),
            Object.assign({}, state.cols[targetColInd], { cells: [
              ...state.cols[targetColInd].cells.slice(0, targetInd),
              state.cols[sourceColInd].cells[sourceInd],
              ...state.cols[targetColInd].cells.slice(targetInd)
            ]}),
            ...state.cols.slice(targetColInd + 1, sourceColInd),
            Object.assign({}, state.cols[sourceColInd], { cells: [
              ...state.cols[sourceColInd].cells.slice(0, sourceInd),
              ...state.cols[sourceColInd].cells.slice(sourceInd + 1)
            ]}),
            ...state.cols.slice(sourceColInd + 1)
          ]
        });
      } else {
        if (sourceInd < targetInd) {
          return Object.assign({}, state, {
            cols: [
              ...state.cols.slice(0, sourceColInd),
              Object.assign({}, state.cols[sourceColInd], { cells: [
                ...state.cols[sourceColInd].cells.slice(0, sourceInd),
                ...state.cols[sourceColInd].cells.slice(sourceInd + 1, targetInd),
                state.cols[sourceColInd].cells[sourceInd],
                ...state.cols[sourceColInd].cells.slice(targetInd)
              ]}),
              ...state.cols.slice(sourceColInd + 1)
            ]
          });
        } else if (targetInd < sourceInd) {
          return Object.assign({}, state, {
            cols: [
              ...state.cols.slice(0, sourceColInd),
              Object.assign({}, state.cols[sourceColInd], { cells: [
                ...state.cols[sourceColInd].cells.slice(0, targetInd),
                state.cols[sourceColInd].cells[sourceInd],
                ...state.cols[sourceColInd].cells.slice(targetInd, sourceInd),
                ...state.cols[sourceColInd].cells.slice(sourceInd + 1)
              ]}),
              ...state.cols.slice(sourceColInd + 1)
            ]
          });
        } else {
          return state;
        }
      }
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

function comparator(a, b) {
  return a.position - b.position;
}

function sortByPosition(cols) {
  for (let i in cols) {
    if (i.cells) {
      cells.sort(comparator);
    }
  }
  cols.sort(comparator);
  return cols;
}
