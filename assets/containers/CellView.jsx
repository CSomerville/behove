import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { updateCellId, initiateFetchCell } from '../actions/cell_actions';
import CellShow from '../components/CellShow';

export class CellView extends Component {

  componentDidMount() {
    const { dispatch, cell, router } = this.props;
    if (cell.id === router.params.cellid) {
      dispatch(initiateFetchCell(cell.id));
    } else {
      dispatch(updateCellId(router.params.cellid));
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, cell } = this.props;
    if (prevProps.cell.id !== cell.id) {
      dispatch(initiateFetchCell(cell.id))
    }
  }

  render() {
    const { dispatch, cell, router } = this.props;
    return (
      <CellShow
        cell={cell}
        router={router}
        backToComb={(e) => {
          e.stopPropagation();
          if (e.target.className === 'cell-backdrop') {
            dispatch(pushState({}, '/app/comb/' + router.params.id));            
          }
        }}
        />
    );
  }
}

function select(state) {
  return {
    cell: state.cell,
    router: state.router
  };
}

export default connect(select)(CellView);
