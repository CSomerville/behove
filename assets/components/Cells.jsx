import React, { Component } from 'react';

export default class Cells extends Component {
  render() {
    return (
      <ul>
        {this.props.cells && this.props.cells.map((cell, i) =>
          <li key={cell.id}>
            <h1 className="cell-title">{cell.name}</h1>
          </li>
        )}
      </ul>
    );
  }
}
