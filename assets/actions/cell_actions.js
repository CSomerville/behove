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
export const SAVE_CHECKLIST = 'SAVE_CHECKLIST'
export const SAVE_CHECKLIST_SUCCESS = 'SAVE_CHECKLIST_SUCCESS';
export const SAVE_CHECKLIST_FAILURE = 'SAVE_CHECKLIST_FAILURE';
export const EDIT_CHECKLIST = 'EDIT_CHECKLIST';
export const DELETE_CHECKLIST = 'DELETE_CHECKLIST';
export const DELETE_CHECKLIST_SUCCESS = 'DELETE_CHECKLIST_SUCCESS';
export const DELETE_CHECKLIST_FAILURE = 'DELETE_CHECKLIST_FAILURE';
export const CANCEL_EDIT_CHECKLIST = 'CANCEL_EDIT_CHECKLIST';

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

function saveChecklist(id){
  return {
    type: SAVE_CHECKLIST,
    id: id
  }
}

function saveChecklistSuccess(){
  return {
    type: SAVE_CHECKLIST_SUCCESS
  }
}

function saveChecklistFailure(err){
  return {
    type: SAVE_CHECKLIST_FAILURE,
    msg: err.message
  }
}

export function initiateSaveChecklist(checklist, base) {

  base = base || '';

  return (dispatch) => {
    dispatch(saveChecklist(checklist.id))
    fetch(base + '/api/checklist/' + checklist.id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        id: checklist.id,
        name: checklist.name,
        cellId: checklist.cellId
      })
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(saveChecklistSuccess()))
      .catch((err) => dispatch(saveChecklistFailure(err)));

  }
}

export function editChecklist(id) {
  return {
    type: EDIT_CHECKLIST,
    id: id
  }
}

function deleteChecklist(id) {
  return {
    type: DELETE_CHECKLIST,
    id: id
  }
}

function deleteChecklistSuccess() {
  return {
    type: DELETE_CHECKLIST_SUCCESS
  }
}

function deleteChecklistFailure(msg) {
  return {
    type: DELETE_CHECKLIST_FAILURE,
    msg: msg
  }
}

export function initiateDeleteChecklist(id, base) {

  base = base || '';

  return (dispatch) => {
    dispatch(deleteChecklist(id));
    fetch(base + '/api/checklist/' + id, {
      method: 'delete',
      credentials: 'same-origin'
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(deleteChecklistSuccess()))
      .catch((err) => dispatch(deleteChecklistFailure(err.message)));

  }
}

export function cancelEditChecklist(id) {
  return {
    type: CANCEL_EDIT_CHECKLIST,
    id: id
  }
}
