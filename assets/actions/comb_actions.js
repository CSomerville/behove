import fetch from 'isomorphic-fetch';
import checkStatus from '../utils/fetch-checkstatus';

export const FETCH_COMB = 'FETCH_COMB';
export const FETCH_COMB_SUCCESS = 'FETCH_COMB_SUCCESS';
export const FETCH_COMB_FAILURE = 'FETCH_COMB_FAILURE';

function fetchComb(id) {
  return {
    type: FETCH_COMB,
    id: id
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
