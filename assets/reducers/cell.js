import {
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE, NEW_CHECKLIST, CHANGE_CHECKLIST_NAME
} from '../actions/cell_actions';

const defaultState = {
  id: null,
  name: null,
  checklists: [],
  checklistItems: [],
  isFetching: 0,
  msg: ''
}

export default function(state = defaultState, action) {
  let ind;
  switch(action.type) {
    case UPDATE_CELL_ID:
      return Object.assign({}, state, {id: action.id});
    case FETCH_CELL:
      return Object.assign({}, state, {
        isFetching: (state.isFetching + 1)
      });
    case FETCH_CELL_SUCCESS:
      return Object.assign({}, state, {
        name: action.cell.name,
        isFetching: (state.isFetching - 1)
      });
    case FETCH_CELL_FAILURE:
      return Object.assign({}, state, {
        msg: action.msg,
        isFetching: (state.isFetching - 1)
      });
    case NEW_CHECKLIST:
      return Object.assign({}, state, {
        checklists: [
          ...state.checklists.slice(), {
            id: action.id,
            cellId: state.id,
            name: action.name,
            editable: action.editable
          }
        ]
      });
    case CHANGE_CHECKLIST_NAME:
      ind = indexById(state.checklists.slice(), action.id);
      return Object.assign({}, state, {
        checklists: [
          ...state.checklists.slice(0, ind),
          Object.assign({}, state.checklists[ind], {
            name: action.name
          }),
          ...state.checklists.slice(ind + 1)
        ]
      });
    default:
      return state;
  }
}

function indexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id && (list[i].id === id)) {
      return i;
    }
  }
  throw new Error('search for id failed, bad input');
}
