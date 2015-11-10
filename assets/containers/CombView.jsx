import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchComb, editCol } from '../actions/comb_actions';
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
          onEditClick={(ind) => {
            dispatch(editCol(ind));
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
