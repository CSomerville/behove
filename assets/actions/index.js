import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';

export const NEW_COMB = 'NEW_COMB';
export const EDIT_COMB = 'EDIT_COMB';
export const EDIT_NEW_COMB_NAME = 'EDIT_COMB_NAME';
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
      isEditing: true
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

export function editCombName(e) {
  return {
    type: 'EDIT_COMB_NAME',
    name: e.target.value
  };
}

function saveEditComb(comb) {
  return {
    type: 'SAVE_EDIT_COMB',
    comb
  };
}

function saveEditCombSuccess(comb) {
  return {
    type: 'SAVE_EDIT_COMB_SUCCESS',
    comb
  };
}

function saveEditCombFailure(comb) {
  return {
    type: 'SAVE_EDIT_COMB_FAILURE',
    comb
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
    fetch('api/combs', { credentials: 'same-origin' })
      .then((res) => { return res.json() },
        (err) => dispatch(fetchCombsFailure(err)))
      .then((combs) => { dispatch(fetchCombsSuccess(combs))},
        (err) => console.log(err));
  }
}

export function initiateSaveEditComb(e) {
  e.preventDefault();
  return (dispatch, getState) => {
    dispatch(saveEditComb());
    fetch('api/comb', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(getState())
    })
      .then((res) => { return res.json() },
        (err) => dispatch(saveEditCombFailure(err)))
      .then((comb) => dispatch(saveEditCombSuccess(comb)));
  }
}

// export const CANCEL_NEW_COMB = 'CANCEL_NEW_COMB';
// export const POST_COMB = 'POST_COMB';
// export const POST_COMB_SUCCESS = 'POST_COMB_SUCCESS';
// export const POST_COMB_FAILURE = 'POST_COMB_FAILURE';
//
//
//
// export function cancelNewComb() {
//   return { type: 'CANCEL_NEW_COMB' };
// }
//
// function postComb(comb) {
//   return {
//     type: 'POST_COMB',
//     comb
//   }
// }
//
// function postCombSuccess(comb) {
//   return {
//     type: 'POST_COMB_SUCCESS',
//     comb
//   }
// }
//
// function postCombFailure(comb, err) {
//   return {
//     type: 'POST_COMB_FAILURE',
//     comb,
//     err
//   }
// }
//
// export function initiatePostComb(e) {
//   e.preventDefault();
//   return (dispatch, getState) => {
//     dispatch(postComb(getState().name));
//     fetch('api/comb', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       credentials: 'same-origin',
//       body: JSON.stringify(getState())
//     })
//       .then((response) => response.json())
//       .then((json) => dispatch(postCombSuccess(json)));
//   }
// }
