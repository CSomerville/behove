import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cellSource = {
  beginDrag(props) {
    return {
      id: props.cell.id,
      colId: props.cell.combColId
    };
  },

  isDragging(props, monitor) {
    return props.cell.id === monitor.getItem().id;
  },

  endDrag(props) {
    props.cellDragEnded(props.cell.combColId, props.cell.id);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


class OneCell extends Component {
  render() {
    const { cell, connectDragSource, isDragging, triggerChangeCellName } = this.props;
    return connectDragSource(
      <div style={{opacity: (isDragging) ? 0 : 1}}>
        {!cell.editable &&
          <div>
            <h1 className="cell-title">{cell.name}</h1>
            <button className="edit-cell"
              onClick={this.props.triggerEditCell.bind(this, cell.id)}>
              edit
            </button>
          </div>
        }
        {cell.editable &&
          <div>
            <input type="text" value={cell.name}
              onChange={triggerChangeCellName.bind(this, cell.id)}/>
            <button className="cancel-edit-cell"
              onClick={this.props.triggerCancelEditCell.bind(this, cell.id)}>
              cancel
            </button>
            <button className="save-edit-cell"
              onClick={this.props.triggerSaveCell.bind(this, cell)}>
              save
            </button>
          </div>
        }
      </div>
    );
  }
}

export default DragSource('cell', cellSource, collect)(OneCell)
