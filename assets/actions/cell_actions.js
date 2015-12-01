import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';
import camelize from 'camelize';
import checkStatus from '../utils/fetch-checkstatus';

export const UPDATE_CELL_ID = 'UPDATE_CELL_ID';
export const FETCH_CELL = 'FETCH_CELL';
export const FETCH_CELL_SUCCESS = 'FETCH_CELL_SUCCESS';
export const FETCH_CELL_FAILURE = 'FETCH_CELL_FAILURE';
export const NEW_CHECKLIST = 'NEW_CHECKLIST';
export const CHANGE_CHECKLIST_NAME = 'CHANGE_CHECKLIST_NAME';

export function updateCellId(id) {
  return {
    type: UPDATE_CELL_ID,
    id: id
  }
}

function fetchCell() {
  return {
    type: FETCH_CELL
  }
}

function fetchCellSuccess(cell) {
  return {
    type: FETCH_CELL_SUCCESS,
    cell: cell
  }
}

function fetchCellFailure(msg) {
  return {
    type: FETCH_CELL_FAILURE,
    msg: msg
  }
}

export function initiateFetchCell(id, base) {

  base = base || '';

  return (dispatch) => {
    dispatch(fetchCell());
    fetch(base + '/api/cell/' + id, {
      credentials: 'same-origin'
    })
      .then((res) => {
        checkStatus(res);
        return res.json()
      })
        .then((cell) => { dispatch(fetchCellSuccess(camelize(cell))) })
        .catch((err) => { dispatch(fetchCellFailure(err.message)) });
  }
}

export function newChecklist() {
  return {
    type: NEW_CHECKLIST,
    id: uuid.v4(),
    name: '',
    editable: true
  }
}

export function changeChecklistName(id, e) {
  return {
    type: CHANGE_CHECKLIST_NAME,
    id: id,
    name: e.target.value
  }
}
