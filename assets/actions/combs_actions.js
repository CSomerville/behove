import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';
import checkStatus from '../utils/fetch-checkstatus';

export const NEW_COMB = 'NEW_COMB';
export const EDIT_COMB = 'EDIT_COMB';
export const CANCEL_EDIT_COMB = 'CANCEL_EDIT_COMB';
export const EDIT_COMB_NAME = 'EDIT_COMB_NAME';
export const SAVE_EDIT_COMB = 'SAVE_EDIT_COMB';
export const SAVE_EDIT_COMB_SUCCESS = 'SAVE_EDIT_COMB_SUCCESS';
export const SAVE_EDIT_COMB_FAILURE = 'SAVE_EDIT_COMB_FAILURE';
export const FETCH_COMBS = 'FETCH_COMBS';
export const FETCH_COMBS_SUCCESS = 'FETCH_COMBS_SUCCESS';
export const FETCH_COMBS_FAILURE = 'FETCH_COMBS_FAILURE';

export function newComb() {
  return {
    type: 'NEW_COMB',
    comb: {
      id: uuid.v4(),
      name: '',
      editable: true
    }
  };
}

export function editComb(ind) {
  if (typeof ind !== 'number') {
    throw new TypeError('editComb requires Number');
  }
  return {
    type: 'EDIT_COMB',
    ind: ind
  }
}

export function cancelEditComb(ind) {
  if (typeof ind !== 'number') {
    throw new TypeError('cancelEditComb requires Number');
  }
  return {
    type: 'CANCEL_EDIT_COMB',
    ind: ind
  }
}

export function editCombName(ind, e) {
  if (typeof ind !== 'number') {
    throw new TypeError('editCombName requires Number for first arg');
  }
  return {
    type: 'EDIT_COMB_NAME',
    ind: ind,
    name: e.target.value
  };
}

function saveEditComb(ind) {
  return {
    type: 'SAVE_EDIT_COMB',
    ind: ind
  };
}

function saveEditCombSuccess(ind) {
  return {
    type: 'SAVE_EDIT_COMB_SUCCESS',
    ind: ind
  };
}

function saveEditCombFailure(ind, err) {
  return {
    type: 'SAVE_EDIT_COMB_FAILURE',
    ind: ind,
    msg: err.message
  };
}

function fetchCombs() {
  return {
    type: 'FETCH_COMBS'
  };
}

function fetchCombsSuccess(combs) {
  return {
    type: 'FETCH_COMBS_SUCCESS',
    combs
  };
}

function fetchCombsFailure(err) {
  return {
    type: 'FETCH_COMBS_FAILURE',
    msg: err.message
  };
}

export function initiateFetchCombs(base) {

  // for test injection
  base = base || '';

  return (dispatch) => {
    dispatch(fetchCombs());
    fetch(base + '/api/combs', { credentials: 'same-origin' })
      .then((res) => {
        checkStatus(res);
        return res.json()
      })
        .then((combs) => { dispatch(fetchCombsSuccess(combs))})
        .catch((err) => dispatch(fetchCombsFailure(err)))
  }
}

export function initiateSaveEditComb(ind, comb, base) {

  // for test injection
  base = base || '';

  return (dispatch) => {
    dispatch(saveEditComb(ind));
    fetch(base + '/api/comb', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        id: comb.id,
        name: comb.name
      })
    })
      .then((res) => {
        checkStatus(res);
        dispatch(saveEditCombSuccess(ind));
      })
      .catch((err) => {
        dispatch(saveEditCombFailure(ind, err))
      });
  }
}
