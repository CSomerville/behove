import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CellView extends Component {
  render() {
    return (
      <div className="cell-backdrop">
        <h1>Cell Name</h1>
      </div>
    );
  }
}

function select(state) {
  return {
    router: state.router
  };
}

export default connect(select)(CellView);
