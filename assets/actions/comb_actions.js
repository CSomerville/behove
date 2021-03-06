import fetch from 'isomorphic-fetch';
import uuid from 'node-uuid';
import camelize from 'camelize';
import checkStatus from '../utils/fetch-checkstatus';

export const FETCH_COMB = 'FETCH_COMB';
export const FETCH_COMB_SUCCESS = 'FETCH_COMB_SUCCESS';
export const FETCH_COMB_FAILURE = 'FETCH_COMB_FAILURE';
export const UPDATE_COMB_ID = 'UPDATE_COMB_ID';
export const EDIT_COL = 'EDIT_COL';
export const CANCEL_EDIT_COL = 'CANCEL_EDIT_COL';
export const CHANGE_COL_NAME = 'CHANGE_COL_NAME';
export const SAVE_EDIT_COL = 'SAVE_EDIT_COL';
export const SAVE_EDIT_COL_SUCCESS = 'SAVE_EDIT_COL_SUCCESS';
export const SAVE_EDIT_COL_FAILURE = 'SAVE_EDIT_COL_FAILURE';
export const DELETE_COL = 'DELETE_COL';
export const DELETE_COL_SUCCESS = 'DELETE_COL_SUCCESS';
export const DELETE_COL_FAILURE = 'DELETE_COL_FAILURE';
export const NEW_COL = 'NEW_COL';
export const REORDER_COLS = 'REORDER_COLS';
export const UPDATE_COL_POS = 'UPDATE_COL_POS';
export const SAVE_COL_POSES ='SAVE_COL_POSES';
export const SAVE_COL_POSES_SUCCESS = 'SAVE_COL_POSES_SUCCESS';
export const SAVE_COL_POSES_FAILURE = 'SAVE_COL_POSES_FAILURE';
export const REORDER_CELLS = 'REORDER_CELLS';
export const APPEND_TO_COL = 'APPEND_TO_COL';
export const UPDATE_CELL_POSES = 'UPDATE_CELL_POSES';
export const SAVE_CELL_POSES = 'SAVE_CELL_POSES';
export const SAVE_CELL_POSES_SUCCESS = 'SAVE_CELL_POSES_SUCCESS';
export const SAVE_CELL_POSES_FAILURE = 'SAVE_CELL_POSES_FAILURE';
export const NEW_CELL = 'NEW_CELL';
export const CHANGE_CELL_NAME = 'CHANGE_CELL_NAME';
export const EDIT_CELL = 'EDIT_CELL';
export const CANCEL_EDIT_CELL = 'CANCEL_EDIT_CELL';
export const SAVE_EDIT_CELL = 'SAVE_EDIT_CELL';
export const SAVE_EDIT_CELL_SUCCESS = 'SAVE_EDIT_CELL_SUCCESS';
export const SAVE_EDIT_CELL_FAILURE = 'SAVE_EDIT_CELL_FAILURE';
export const DELETE_CELL = 'DELETE_CELL';
export const DELETE_CELL_SUCCESS = 'DELETE_CELL_SUCCESS';
export const DELETE_CELL_FAILURE = 'DELETE_CELL_FAILURE';

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
        .then((comb) => { dispatch(fetchCombSuccess(camelize(comb))) })
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

function saveEditCol(id) {
  return {
    type: SAVE_EDIT_COL,
    id: id
  }
}

function saveEditColSuccess(id) {
  return {
    type: SAVE_EDIT_COL_SUCCESS,
    id: id
  }
}

function saveEditColFailure(id, msg) {
  return {
    type: SAVE_EDIT_COL_FAILURE,
    id: id,
    msg: msg
  }
}

export function initiateSaveEditCol(col, base) {
  base = base || '';

  return (dispatch) => {
    dispatch(saveEditCol(col.id));
    fetch(base + '/api/col/' + col.id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        id: col.id,
        name: col.name,
        combId: col.combId,
        position: col.position
      })
    })
      .then((res) => checkStatus(res))
      .then(() => { dispatch(saveEditColSuccess(col.id)) })
      .catch((err) => { dispatch(saveEditColFailure(col.id, err.message)) });
  }
}

function deleteCol(id) {
  return {
    type: DELETE_COL,
    id: id
  }
}

function deleteColSuccess(id) {
  return {
    type: DELETE_COL_SUCCESS,
    id: id
  }
}

function deleteColFailure(msg, id) {
  return {
    type: DELETE_COL_FAILURE,
    id: id,
    msg: msg
  }
}

export function initiateDeleteCol(id, base) {

  base = base || '';

  return (dispatch) => {
    dispatch(deleteCol(id));
    fetch(base + '/api/col/' + id, {
      method: 'delete',
      credentials: 'same-origin'
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(deleteColSuccess(id)))
      .catch((err) => dispatch(deleteColFailure(err.message, id)));

  }
}

export function newCol(combId) {
  return {
    type: NEW_COL,
    col: {
      id: uuid.v4(),
      combId: combId,
      name: '',
      editable: true,
      cells: []
    }
  }
}

export function reorderCols(sourceId, targetId) {
  return {
    type: REORDER_COLS,
    sourceId: sourceId,
    targetId: targetId
  }
}

function updateColPos(ind) {
  return {
    type: UPDATE_COL_POS,
    ind: ind
  };
}

function saveColPoses() {
  return {
    type: SAVE_COL_POSES
  };
}

function saveColPosesSuccess() {
  return {
    type: SAVE_COL_POSES_SUCCESS
  };
}

function saveColPosesFailure(msg) {
  return {
    type: SAVE_COL_POSES_FAILURE,
    msg: msg
  };
}

export function initiateSaveColPoses(cols, base) {

  base = base || '';

  return (dispatch, getState) => {
    cols.forEach((col, i) => {
      dispatch(updateColPos(i));
    });

    dispatch(saveColPoses());
    fetch(base + '/api/cols', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(
        getState().comb.cols
      )
    })
      .then((res) => checkStatus(res))
      .then((res) => dispatch(saveColPosesSuccess()))
      .catch((err) => dispatch(saveColPosesFailure(err.message)));
  }
}

export function reorderCells(sourceId, sourceColId, targetId, targetColId) {
  return {
    type: REORDER_CELLS,
    sourceId: sourceId,
    sourceColId: sourceColId,
    targetId: targetId,
    targetColId: targetColId
  }
}

export function appendToCol(sourceId, targetColId) {
  return {
    type: APPEND_TO_COL,
    sourceId: sourceId,
    targetColId: targetColId
  };
}

function updateCellPoses(sourceColId, sourceId) {
  return {
    type: UPDATE_CELL_POSES,
    sourceColId: sourceColId,
    sourceId: sourceId
  }
}

function saveCellPoses() {
  return {
    type: SAVE_CELL_POSES
  }
}

function saveCellPosesSuccess() {
  return {
    type: SAVE_CELL_POSES_SUCCESS
  }
}

function saveCellPosesFailure(err) {
  return {
    type: SAVE_CELL_POSES_FAILURE,
    msg: err
  }
}

export function initiateSaveCellPoses(sourceColId, sourceId, base){
  base = base || '';

  return (dispatch, getState) => {
    dispatch(updateCellPoses(sourceColId, sourceId));
    dispatch(saveCellPoses());

    let cells = [];
    getState().comb.cols.forEach((el) => {
      el.cells.forEach((cell) => {
        cells.push(cell);
      });
    });

    fetch(base + '/api/cells', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(
        cells
      )
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(saveCellPosesSuccess()))
      .catch((err) => dispatch(saveCellPosesFailure(err.message)));
  }
}

export function newCell(combColId) {
  return {
    type: NEW_CELL,
    id: uuid.v4(),
    combColId: combColId,
    name: '',
    editable: true
  }
}

export function changeCellName(id, e) {
  return {
    type: CHANGE_CELL_NAME,
    id: id,
    name: e.target.value
  }
}

export function editCell(id) {
  return {
    type: EDIT_CELL,
    id: id
  };
}

export function cancelEditCell(id) {
  return {
    type: CANCEL_EDIT_CELL,
    id: id
  }
}

function saveEditCell(id) {
  return {
    type: SAVE_EDIT_CELL,
    id: id
  }
}

function saveEditCellSuccess(){
  return {
    type: SAVE_EDIT_CELL_SUCCESS
  }
}

function saveEditCellFailure(msg) {
  return {
    type: SAVE_EDIT_CELL_FAILURE,
    msg: msg
  }
}

export function initiateSaveEditCell(cell, base) {
  base = base || '';

  return (dispatch) => {

    dispatch(saveEditCell(cell.id));

    fetch(base + '/api/cell', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(
        cell
      )
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(saveEditCellSuccess()))
      .catch((err) => dispatch(saveEditCellFailure(err.message)));
  }
}

function deleteCell(id) {
  return {
    type: DELETE_CELL,
    id: id
  }
}

function deleteCellSuccess() {
  return {
    type: DELETE_CELL_SUCCESS
  }
}

function deleteCellFailure(msg) {
  return {
    type: DELETE_CELL_FAILURE,
    msg: msg
  }
}

export function initiateDeleteCell(id, base) {
  base = base || '';

  return (dispatch) => {
    dispatch(deleteCell(id));
    fetch(base + '/api/cell', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(
        {id: id}
      )
    })
      .then((res) => checkStatus(res))
      .then(() => dispatch(deleteCellSuccess()))
      .catch((err) => dispatch(deleteCellFailure(err.message)))

  }
}
