import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newChecklist } from '../actions/cell_actions';
import CellControls from '../components/CellControls';

export class CellControlsWrap extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <CellControls
        triggerNewChecklist={() => {
          dispatch(newChecklist())
        }}
        />
    );
  }
}

function select(state) {
  return {
    cell: state.cell
  }
}

export default connect(select)(CellControlsWrap);
