import fetch from 'isomorphic-fetch';
import checkStatus from '../utils/fetch-checkstatus';

export const FETCH_COMB = 'FETCH_COMB';
export const FETCH_COMB_SUCCESS = 'FETCH_COMB_SUCCESS';
export const FETCH_COMB_FAILURE = 'FETCH_COMB_FAILURE';
export const UPDATE_COMB_ID = 'UPDATE_COMB_ID';
export const EDIT_COL = 'EDIT_COL';
export const CANCEL_EDIT_COL = 'CANCEL_EDIT_COL';
export const CHANGE_COL_NAME = 'CHANGE_COL_NAME';

function fetchComb() {
  return {
    type: FETCH_COMB
  }
}

function fetchCombSuccess(comb) {
  return {
    type: FETCH_COMB_SUCCESS,
    comb: comb
  }
}

function fetchCombFailure(msg) {
  return {
    type: FETCH_COMB_FAILURE,
    msg: msg
  }
}

export function initiateFetchComb(id, base) {

  base = base || '';

  return (dispatch) => {
    dispatch(fetchComb(id));
    fetch(base + '/api/comb/' + id, { credentials: 'same-origin' })
      .then((res) => {
        checkStatus(res);
        return res.json();
      })
        .then((comb) => { dispatch(fetchCombSuccess(comb)) })
        .catch((err) => { dispatch(fetchCombFailure(err.message)) });
  }
}

export function updateCombId(id) {
  return {
    type: UPDATE_COMB_ID,
    id: id
  }
}

export function editCol(id) {
  return {
    type: EDIT_COL,
    id: id
  }
}

export function cancelEditCol(id) {
  return {
    type: CANCEL_EDIT_COL,
    id: id
  }
}

export function changeColName(id, e) {
  return {
    type: CHANGE_COL_NAME,
    id: id,
    name: e.target.value
  }
}
