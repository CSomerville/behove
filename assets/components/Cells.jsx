import React, { Component } from 'react';
import OneCellWrapper from './OneCellWrapper';

export default class Cells extends Component {
  render() {
    const { cells, ...rest } = this.props;
    return (
      <ul>
        {cells && cells.map((cell, i) =>
          <li key={cell.id}>
            <OneCellWrapper
              cell={cell}
              ind={i}
              { ...rest }
              />
          </li>
        )}
      </ul>
    );
  }
}
