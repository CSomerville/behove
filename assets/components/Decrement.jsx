import React, { Component } from 'react';

export default class Decrement extends Component {
  render() {
    return (
      <button onClick={this.props.onDecrementClick}>-</button>
    );
  }
}
