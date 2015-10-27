import React, { Component } from 'react';

export default class AddComb extends Component {
  render() {
    return ( <button onClick={this.props.onAddCombClick}>+</button> );
  }
}
