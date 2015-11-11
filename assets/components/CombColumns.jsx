import React, { Component } from 'react';
import Cells from './Cells';

export default class CombColumns extends Component {
  render() {
    return (
      <ul>
        {this.props.comb.cols.map((col, i) =>
          <li key={col.id}>
            {!col.editable &&
              <div>
                <h1 className="column-title">{col.name}</h1>
                <button className="edit-col"
                  onClick={this.props.onEditClick.bind(this, col.id)}>
                  edit
                </button>
                <Cells cells={col.cells} />
              </div>
            }
            {col.editable &&
              <div>
                <input type="text" value={col.name}
                  onChange={this.props.onInputChange.bind(this, col.id)}
                  />
                <button className="col-delete"
                  onClick={this.props.onDeleteCol.bind(this, col.id)}>
                  delete
                </button>
                <button className="col-cancel"
                  onClick={this.props.onCancelCol.bind(this, col.id)}>
                  cancel
                </button>
                <button className="col-save"
                  onClick={this.props.onSaveClick.bind(this, col)}>
                  save
                </button>
              </div>
            }
          </li>
        )}
      </ul>
    );
  }
}
