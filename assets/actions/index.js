import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';

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

export function editComb(comb, ind) {
  return {
    type: 'EDIT_COMB',
    comb,
    ind: ind
  }
}

export function cancelEditComb(ind) {
  return {
    type: 'CANCEL_EDIT_COMB',
    ind: ind
  }
}

export function editCombName(ind, e) {
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

function saveEditCombFailure(ind) {
  return {
    type: 'SAVE_EDIT_COMB_FAILURE',
    ind: ind
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
    msg: err
  };
}

export function initiateFetchCombs() {
  return (dispatch) => {
    dispatch(fetchCombs);
    fetch('/api/combs', { credentials: 'same-origin' })
      .then((res) => { return res.json() },
        (err) => dispatch(fetchCombsFailure(err)))
      .then((combs) => { dispatch(fetchCombsSuccess(combs))},
        (err) => console.log(err));
  }
}

export function initiateSaveEditComb(ind, comb) {
  return (dispatch) => {
    dispatch(saveEditComb(ind));
    fetch('api/comb', {
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
      .then(() => { dispatch(saveEditCombSuccess(ind)) },
        (err) => dispatch(saveEditCombFailure(ind)));
  }
}
