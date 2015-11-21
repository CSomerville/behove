import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchComb, editCol, initiateSaveEditCol, cancelEditCol, changeColName,
  initiateDeleteCol, newCol, reorderCols, initiateSaveColPoses, reorderCells, insertInEmptyCol,
  initiateSaveCellPoses, newCell, changeCellName, editCell, cancelEditCell
 } from '../actions/comb_actions';
import CombColumns from '../components/CombColumns';

export class CombView extends Component {
  componentDidMount() {
    const { dispatch, comb } = this.props;
    dispatch(initiateFetchComb(comb.id));
  }

  render() {
    const { dispatch, comb } = this.props;
    return (
      <div>
        <CombColumns
          comb={comb}
          onEditClick={(id) => {
            dispatch(editCol(id));
          }}
          onInputChange={(id, e) => {
            dispatch(changeColName(id, e));
          }}
          onSaveClick={(col) => {
            dispatch(initiateSaveEditCol(col));
          }}
          onCancelCol={(id) => {
            dispatch(cancelEditCol(id));
          }}
          onDeleteCol={(id) => {
            dispatch(initiateDeleteCol(id));
          }}
          onAddCol={(id) => {
            dispatch(newCol(id));
          }}
          triggerReorder={(sourceId, targetId) => {
            dispatch(reorderCols(sourceId, targetId));
          }}
          colDragEnded={() => {
            dispatch(initiateSaveColPoses(comb.cols));
          }}
          triggerCellReorder={(sourceId, sourceColId, targetId, targetColId) => {
            dispatch(reorderCells(sourceId, sourceColId, targetId, targetColId));
          }}
          triggerInsert={(sourceId, targetColId) => {
            dispatch(insertInEmptyCol(sourceId, targetColId));
          }}
          cellDragEnded={(sourceColId, sourceId) => {
            dispatch(initiateSaveCellPoses(sourceColId, sourceId));
          }}
          triggerNewCell={(colId) => {
            dispatch(newCell(colId));
          }}
          triggerChangeCellName={(cellId, e) => {
            dispatch(changeCellName(cellId, e));
          }}
          triggerEditCell={(id) => {
            dispatch(editCell(id));
          }}
          triggerCancelEditCell={(id) => {
            dispatch(cancelEditCell(id));
          }}
          />
      </div>
    );
  }
}

function select(state) {
  return {
    comb: state.comb
  }
}

export default connect(select)(CombView);
