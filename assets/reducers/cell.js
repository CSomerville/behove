import {
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE
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
    default:
      return state;
  }
}
