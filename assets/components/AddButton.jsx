import React, { Component } from 'react';

export default class AddButton extends Component {
  render() {
    return ( <button className={this.props.buttonClass}
      onClick={this.props.onAddClick}>
        +
      </button> );
  }
}
