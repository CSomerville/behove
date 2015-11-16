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
      <h1 style={{opacity: (isDragging) ? 0 : 1}}
        className="cell-title">{cell.name}</h1>
    );
  }
}

export default DragSource('cell', cellSource, collect)(OneCell)
