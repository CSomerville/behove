import React, { Component } from 'react';

export default class Comb extends Component {
  render() {
    return (
      <ul>
        {this.props.combs.combs.map((comb) =>
          <li key={comb.id}>{comb.name}</li>
        )}
      </ul>
    );
  }
}
