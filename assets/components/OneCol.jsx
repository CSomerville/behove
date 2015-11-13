import React, { Component } from 'react';
import Cells from './Cells';
import { DragSource } from 'react-dnd';

const colSource = {
  beginDrag(props) {
    return { id: props.col.id };
  },

  isDragging(props, monitor) {
    return props.col.id === monitor.getItem().id;
  },

  endDrag(props) {
    props.colDragEnded();
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    dragSource: monitor.getItem()
  }
}

export default class OneCol extends Component {

  render() {
    const { connectDragSource, col, dragSource, connectDragPreview, isDragging } = this.props;
    return connectDragSource(
        <div style={{opacity: (isDragging) ? 0 : 1}}>
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
