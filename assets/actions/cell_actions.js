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
export const NEW_CHECKLIST_ITEM = 'NEW_CHECKLIST_ITEM';
export const CHANGE_CHECKLIST_ITEM_NAME = 'CHANGE_CHECKLIST_ITEM_NAME';
export const SAVE_CHECKLIST_ITEM = 'SAVE_CHECKLIST_ITEM';
export const SAVE_CHECKLIST_ITEM_SUCCESS = 'SAVE_CHECKLIST_ITEM_SUCCESS';
export const SAVE_CHECKLIST_ITEM_FAILURE = 'SAVE_CHECKLIST_ITEM_FAILURE';
export const EDIT_CHECKLIST_ITEM = 'EDIT_CHECKLIST_ITEM';
export const CANCEL_EDIT_CHECKLIST_ITEM = 'CANCEL_EDIT_CHECKLIST_ITEM';
export const DELETE_CHECKLIST_ITEM = 'DELETE_CHECKLIST_ITEM';
export const DELETE_CHECKLIST_ITEM_SUCCESS = 'DELETE_CHECKLIST_ITEM_SUCCESS';
export const DELETE_CHECKLIST_ITEM_FAILURE = 'DELETE_CHECKLIST_ITEM_FAILURE';
export const TOGGLE_ITEM_COMPLETION = 'TOGGLE_ITEM_COMPLETION';

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

export function newChecklistItem(checklistId) {
  return {
    type: NEW_CHECKLIST_ITEM,
    checklistId: checklistId,
    id: uuid.v4()
  }
}

export function changeChecklistItemName(id, e) {
  return {
    type: CHANGE_CHECKLIST_ITEM_NAME,
    id: id,
    name: e.target.value
  }
}

function saveChecklistItem(id) {
  return {
    type: SAVE_CHECKLIST_ITEM,
    id: id
  }
}

function saveChecklistItemSuccess() {
  return {
    type: SAVE_CHECKLIST_ITEM_SUCCESS
  }
}

function saveChecklistItemFailure(err) {
  return {
    type: SAVE_CHECKLIST_ITEM_FAILURE,
    msg: err.message
  }
}

export function initiateSaveChecklistItem(checklistItem, base) {
  base = base || '';

  return (dispatch) => {
    dispatch(saveChecklistItem(checklistItem.id));
    fetch(base + '/api/checklist-item/' + checklistItem.id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        id: checklistItem.id,
        checklistId: checklistItem.checklistId,
        name: checklistItem.name,
        completed: checklistItem.completed,
        position: checklistItem.position
      })
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(saveChecklistItemSuccess()))
      .catch((err) => dispatch(saveChecklistItemFailure(err)));
  }
}

export function editChecklistItem(id) {
  return {
    type: EDIT_CHECKLIST_ITEM,
    id: id
  }
}

export function cancelEditChecklistItem(id) {
  return {
    type: CANCEL_EDIT_CHECKLIST_ITEM,
    id: id
  }
}

function deleteChecklistItem(id) {
  return {
    type: DELETE_CHECKLIST_ITEM,
    id: id
  }
}

function deleteChecklistItemSuccess() {
  return {
    type: DELETE_CHECKLIST_ITEM_SUCCESS
  }
}

function deleteChecklistItemFailure(err) {
  return {
    type: DELETE_CHECKLIST_ITEM_FAILURE,
    msg: err.message
  }
}

export function initiateDeleteChecklistItem(id, base) {

  base = base || ''

  return (dispatch) => {
    dispatch(deleteChecklistItem(id));
    fetch(base + '/api/checklist-item/' + id, {
      method: 'delete',
      credentials: 'same-origin'
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(deleteChecklistItemSuccess()))
      .catch((err) => dispatch(deleteChecklistItemFailure(err)));
  }
}

export function toggleItemCompletion(id) {
  return {
    type: TOGGLE_ITEM_COMPLETION,
    id: id
  }
}
