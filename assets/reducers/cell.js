import {
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE, NEW_CHECKLIST, CHANGE_CHECKLIST_NAME,
  SAVE_CHECKLIST, SAVE_CHECKLIST_SUCCESS, SAVE_CHECKLIST_FAILURE, EDIT_CHECKLIST, DELETE_CHECKLIST,
  DELETE_CHECKLIST_SUCCESS, DELETE_CHECKLIST_FAILURE, CANCEL_EDIT_CHECKLIST, NEW_CHECKLIST_ITEM,
  CHANGE_CHECKLIST_ITEM_NAME, SAVE_CHECKLIST_ITEM, SAVE_CHECKLIST_ITEM_SUCCESS, SAVE_CHECKLIST_ITEM_FAILURE,
  EDIT_CHECKLIST_ITEM, CANCEL_EDIT_CHECKLIST_ITEM
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
        checklists: action.cell.checklists,
        checklistItems: action.cell.checklistItems,
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
    case SAVE_CHECKLIST:
      ind = indexById(state.checklists.slice(), action.id);
      return Object.assign({}, state, {
        isFetching: (state.isFetching + 1),
        checklists: [
          ...state.checklists.slice(0, ind),
          Object.assign({}, state.checklists[ind], {
            editable: false
          }),
          ...state.checklists.slice(ind + 1)
        ]
      });
    case SAVE_CHECKLIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: (state.isFetching - 1)
      });
    case SAVE_CHECKLIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: (state.isFetching - 1),
        msg: action.msg
      });
    case EDIT_CHECKLIST:
      ind = indexById(state.checklists, action.id);
      return Object.assign({}, state, {
        checklists: [
          ...state.checklists.slice(0, ind),
          Object.assign({}, state.checklists[ind], {
            editable: true,
            prevName: state.checklists[ind].name
          }),
          ...state.checklists.slice(ind + 1)
        ]
      });
    case DELETE_CHECKLIST:
      ind = indexById(state.checklists, action.id);
      return Object.assign({}, state, {
        isFetching: (state.isFetching + 1),
        checklists: [
          ...state.checklists.slice(0, ind),
          ...state.checklists.slice(ind + 1)
        ]
      });
    case DELETE_CHECKLIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: (state.isFetching - 1)
      });
    case DELETE_CHECKLIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: (state.isFetching - 1),
        msg: action.msg
      });
    case CANCEL_EDIT_CHECKLIST:
      ind = indexById(state.checklists, action.id);
      return Object.assign({}, state, {
        checklists: [
          ...state.checklists.slice(0, ind),
          Object.assign({}, state.checklists[ind], {
            editable: false,
            name: state.checklists[ind].prevName
          }),
          ...state.checklists.slice(ind + 1)
        ]
      });
    case NEW_CHECKLIST_ITEM:
      const pos = groupById(state.checklistItems, action.checklistId).length;
      return Object.assign({}, state, {
        checklistItems: [
          ...state.checklistItems.slice(), {
            id: action.id,
            checklistId: action.checklistId,
            name: '',
            prevName: '',
            editable: true,
            completed: false,
            position: pos
          }
        ]
      });
    case CHANGE_CHECKLIST_ITEM_NAME:
      ind = indexById(state.checklistItems.slice(), action.id);
      return Object.assign({}, state, {
        checklistItems: [
          ...state.checklistItems.slice(0, ind),
          Object.assign({}, state.checklistItems[ind], {
            name: action.name
          }),
          ...state.checklistItems.slice(ind + 1)
        ]
      });
    case SAVE_CHECKLIST_ITEM:
      ind = indexById(state.checklistItems.slice(), action.id);
      return Object.assign({}, state, {
        isFetching: (state.isFetching + 1),
        checklistItems: [
          ...state.checklistItems.slice(0, ind),
          Object.assign({}, state.checklistItems[ind], {
            editable: false
          }),
          ...state.checklistItems.slice(ind + 1)
        ]
      });
    case SAVE_CHECKLIST_ITEM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: (state.isFetching - 1)
      });
    case SAVE_CHECKLIST_ITEM_FAILURE:
      return Object.assign({}, state, {
        isFetching: (state.isFetching - 1),
        msg: action.msg
      });
    case EDIT_CHECKLIST_ITEM:
      ind = indexById(state.checklistItems.slice(), action.id)
      return Object.assign({}, state, {
        checklistItems: [
          ...state.checklistItems.slice(0, ind),
          Object.assign({}, state.checklistItems[ind], {
            editable: true,
            prevName: state.checklistItems[ind].name
          }),
          ...state.checklistItems.slice(ind + 1)
        ]
      });
    case CANCEL_EDIT_CHECKLIST_ITEM:
      ind = indexById(state.checklistItems.slice(), action.id)
      return Object.assign({}, state, {
        checklistItems: [
          ...state.checklistItems.slice(0, ind),
          Object.assign({}, state.checklistItems[ind], {
            editable: false,
            name: state.checklistItems[ind].prevName
          }),
          ...state.checklistItems.slice(ind + 1)
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

function groupById(list, checklistId) {
  let acc = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].checklistId && (list[i].checklistId === checklistId)) {
      acc = [...acc.slice(), list.slice(i, i + 1)]
    }
  }
  return acc;
}
