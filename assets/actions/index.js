import fetch from 'isomorphic-fetch';

function requestNewComb(comb) {

}

function receiveNewComb(comb, ) {

}

function postNewComb(comb) {
  return (dispatch) => {
    dispatch(requestNewComb(comb));
    return fetch('/newComb', {
      method: 'post',
      body: comb
    })
      .then((response) => response.json())
      .then((json) => dispatch(receiveNewComb(comb, json)))
  }
}
