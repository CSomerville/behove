import React, { Component } from 'react';

export default class CellControls extends Component {
  render() {
    return (
      <div className="cell-show-controls">
        <button className="new-checklist"
          onClick={this.props.triggerNewChecklist}>
          add checklist
        </button>
      </div>
    );
  }
}
