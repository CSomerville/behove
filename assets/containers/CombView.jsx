import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchComb, editCol, initiateSaveEditCol, cancelEditCol, changeColName,
  initiateDeleteCol } from '../actions/comb_actions';
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
