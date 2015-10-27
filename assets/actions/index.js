import fetch from 'isomorphic-fetch';

export const NEW_COMB = 'NEW_COMB';
export const EDIT_NEW_COMB_NAME = 'EDIT_NEW_COMB_NAME';
export const CANCEL_NEW_COMB = 'CANCEL_NEW_COMB';
export const POST_COMB = 'POST_COMB';
export const POST_COMB_SUCCESS = 'POST_COMB_SUCCESS';
export const POST_COMB_FAILURE = 'POST_COMB_FAILURE';

export function newComb() {
  return { type: 'NEW_COMB' };
}

export function editNewCombName(comb) {
  return {
    type: 'EDIT_NEW_COMB_NAME',
    comb
  }
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

export function initiatePostComb(comb) {
  return (dispatch) => {
    dispatch(postComb(comb));
    fetch('api/comb', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(comb)
    })
      .then((response) => response.json())
      .then((json) => dispatch(postCombSuccess(json)));
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
// }
