import React, { Component } from 'react';
import CellControlsWrap from '../containers/CellControlsWrap';
import ChecklistsWrap from '../containers/ChecklistsWrap';

export default class CellShow extends Component {
  render() {
    const { cell, router } = this.props;
    const hasChecklists = (cell.checklists.length > 0);
    return (
      <div className="cell-backdrop" onClick={this.props.backToComb}>
        <div className='cell-show'>
          <h1>{cell.name}</h1>
          <CellControlsWrap />
          {hasChecklists &&
            <div>
              <ChecklistsWrap />
            </div>
          }
        </div>
      </div>
    );
  }
}
