import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchComb } from '../actions/comb_actions';

export class CombView extends Component {
  componentDidMount() {
    const { dispatch, comb } = this.props;
    dispatch(initiateFetchComb(comb.id));
  }

  render() {
    return (
      <div></div>
    );
  }
}

function select(state) {
  return {
    comb: state.comb
  }
}

export default connect(select)(CombView);
