import React, { Component } from 'react';
import Cells from './Cells';

export default class CombColumns extends Component {
  render() {
    return (
      <ul>
        {this.props.comb.cols.map((col, i) =>
          <li key={col.position}>
            <h1 className="column-title">{col.name}</h1>
            <Cells cells={col.cells} />
          </li>
        )}
      </ul>
    );
  }
}
