import React, { Component } from 'react';

export default class CellShow extends Component {
  render() {
    const { cell, router } = this.props;
    return (
      <div className="cell-backdrop" onClick={this.props.backToComb}>
        <div className='cell-show'>
          <h1>{cell.name}</h1>
        </div>
      </div>
    );
  }
}
