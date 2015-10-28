import React, { Component } from 'react';

export default class Comb extends Component {
  render() {
    return (
      <ul>
        {this.props.combs.combs.map((comb, i) =>
          <li key={comb.id}>
            <h1>{comb.name}</h1>
            <button onClick={this.props.makeEditable.bind(this, comb, i)}>edit</button>
          </li>
        )}
      </ul>
    );
  }
}
