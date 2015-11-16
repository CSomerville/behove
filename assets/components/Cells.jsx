import React, { Component } from 'react';
import OneCellWrapper from './OneCellWrapper';

export default class Cells extends Component {
  render() {
    return (
      <ul>
        {this.props.cells && this.props.cells.map((cell, i) =>
          <li key={cell.id}>
            <OneCellWrapper
              cell={cell}
              triggerCellReorder={this.props.triggerCellReorder}
              />
          </li>
        )}
      </ul>
    );
  }
}
