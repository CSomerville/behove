import fetch from 'isomorphic-fetch';

export const NEW_COMB = 'NEW_COMB';
export const CANCEL_NEW_COMB = 'CANCEL_NEW_COMB';
export const POST_COMB = 'POST_COMB';
export const POST_COMB_SUCCESS = 'POST_COMB_SUCCESS';
export const POST_COMB_FAILURE = 'POST_COMB_FAILURE';

export function newComb() {
  return { type: 'NEW_COMB' };
}

export function cancelNewComb() {
  return { type: 'CANCEL_NEW_COMB' };
}

function postComb(comb) {
  return {
    type: 'POST_COMB',
    comb
  }
}

function postCombSuccess(comb) {
  return {
    type: 'POST_COMB_SUCCESS',
    comb
  }
}

function postCombFailure(comb, err) {
  return {
    type: 'POST_COMB_FAILURE',
    comb,
    err
  }
}

// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT';
//
// export function increment() {
//   return { type: INCREMENT };
// }
//
// export function decrement() {
//   return { type: DECREMENT };
}
