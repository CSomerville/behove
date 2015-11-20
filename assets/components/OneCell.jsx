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
    const { cell, connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{opacity: (isDragging) ? 0 : 1}}>
        {!cell.editable &&
          <h1 className="cell-title">{cell.name}</h1>
        }
        {cell.editable &&
          <div>
            <input type="text" value={cell.name} />
            <h1>googgoo</h1>
          </div>
        }
      </div>
    );
  }
}

export default DragSource('cell', cellSource, collect)(OneCell)
