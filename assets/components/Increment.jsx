import React, { Component } from 'react';

export default class Increment extends Component {
  render() {
    return (
      <button onClick={this.props.onIncrementClick}>+</button>
    );
  }
}
