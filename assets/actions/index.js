// import fetch from 'isomorphic-fetch';
//
// export const REQUEST_NEW_COMB = 'REQUEST_NEW_COMB';
// export const RECEIVE_NEW_COMB = 'RECEIVE_NEW_COMB';
//
// function requestNewComb(comb) {
//   type: 'REQUEST_NEW_COMB',
//   comb
// }
//
// function receiveNewComb(comb) {
//   type: 'RECEIVE_NEW_COMB',
//   comb: {id: comb.id}
// }
//
// export function postNewComb(comb) {
//   return (dispatch) => {
//     dispatch(requestNewComb(comb));
//     return fetch('/api/newComb', {
//       method: 'post',
//       body: JSON.stringify(comb)
//     })
//       .then((response) => response.json())
//       .then((comb) => dispatch(receiveNewComb(comb)));
//   }
// }

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}
