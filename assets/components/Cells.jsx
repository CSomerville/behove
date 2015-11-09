import React, { Component } from 'react';

export default class Cells extends Component {
  render() {
  console.log(this.props);
    return (
      <ul>
        {this.props.cells.map((cell, i) =>
          <li key={cell.position}>
            <h1 className="cell-title">{cell.name}</h1>
          </li>
        )}
      </ul>
    );
  }
}
