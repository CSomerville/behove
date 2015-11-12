import React, { Component } from 'react';
import Cells from './Cells';
import { DragSource } from 'react-dnd';

const colSource = {
  beginDrag(props) {
    return {};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default class OneCol extends Component {
  render() {
    const { connectDragSource, col } = this.props;
    return connectDragSource(
      <div>
        {!col.editable &&
          <div>
            <h1 className="column-title">{col.name}</h1>
            <button className="edit-col"
              onClick={this.props.onEditClick.bind(this, col.id)}>
              edit
            </button>
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
        <Cells cells={col.cells} />
      </div>
    );
  }
}

export default DragSource('col', colSource, collect)(OneCol);
