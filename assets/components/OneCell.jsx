import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cellSource = {
  beginDrag(props) {
    return {
      id: props.cell.id
    };
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}


class OneCell extends Component {
  render() {
    const { cell, connectDragSource } = this.props;
    return connectDragSource(
      <h1 className="cell-title">{cell.name}</h1>
    );
  }
}

export default DragSource('cell', cellSource, collect)(OneCell)
