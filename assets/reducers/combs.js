import {
  NEW_COMB, EDIT_COMB, CANCEL_EDIT_COMB, EDIT_COMB_NAME, SAVE_EDIT_COMB,
  SAVE_EDIT_COMB_SUCCESS, SAVE_EDIT_COMB_FAILURE, FETCH_COMBS, FETCH_COMBS_SUCCESS,
  FETCH_COMBS_FAILURE
} from '../actions/combs_actions';

export default function(state = { combs: [], isFetching: false, msg: '' }, action) {
  switch(action.type) {
  case NEW_COMB:
    return Object.assign({}, state, {
      combs: [
        ...state.combs,
        action.comb
      ]
    });
  case EDIT_COMB:
    return Object.assign({}, state, {
      combs: [
        ...state.combs.slice(0, action.ind),
        Object.assign({}, state.combs[action.ind], {
          editable: true,
          prevName: state.combs[action.ind].name
        }),
        ...state.combs.slice(action.ind + 1)
      ]
    });
  case CANCEL_EDIT_COMB:
    return Object.assign({}, state, {
      combs: [
        ...state.combs.slice(0, action.ind),
        Object.assign({}, state.combs[action.ind], {
          editable: false,
          name: state.combs[action.ind].prevName
        }),
        ...state.combs.slice(action.ind + 1)
      ]
    });
  case EDIT_COMB_NAME:
    return Object.assign({}, state, {
      combs: [
        ...state.combs.slice(0, action.ind),
        Object.assign({}, state.combs[action.ind], { name: action.name }),
        ...state.combs.slice(action.ind + 1)
      ]
    });
  case SAVE_EDIT_COMB:
    return Object.assign({}, state, {
      combs: [
        ...state.combs.slice(0, action.ind),
        Object.assign({}, state.combs[action.ind], {
          editable: false,
          isSaving: true
        }),
        ...state.combs.slice(action.ind + 1)
      ]
    });
  case SAVE_EDIT_COMB_SUCCESS:
    return Object.assign({}, state, {
      combs: [
        ...state.combs.slice(0, action.ind),
        Object.assign({}, state.combs[action.ind], { isSaving: false }),
        ...state.combs.slice(action.ind + 1)
      ]
    });
  case SAVE_EDIT_COMB_FAILURE:
    return Object.assign({}, state, {
      combs: [
        ...state.combs.slice(0, action.ind),
        Object.assign({}, state.combs[action.ind], { isSaving: false }),
        ...state.combs.slice(action.ind + 1)
      ]
    })
  case FETCH_COMBS:
    return Object.assign({}, state, { isFetching: true });
  case FETCH_COMBS_SUCCESS:
    return Object.assign({}, state, { combs: action.combs, isFetching: false });
  case FETCH_COMBS_FAILURE:
    return Object.assign({}, state, { msg: action.msg, isFetching: false });
  default:
    return state;
  }
}
