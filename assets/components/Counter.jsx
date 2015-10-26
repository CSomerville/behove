import React, { Component } from 'react';

export default class Counter extends Component {
  render() {
    return (
      <h1>{this.props.counter}</h1>
    );
  }
}
