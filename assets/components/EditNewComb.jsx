import React, { Component } from 'react';

export default class EditNewComb extends Component {
  render() {
    return (
      <form>
        <input type="text" value={this.props.name} onChange={this.props.inputChanged} />
        <button onClick={this.props.onNewCombCancel}>Cancel</button>
        <button onClick={this.props.onNewCombSave}>Save</button>
      </form>
    );
  }
}
