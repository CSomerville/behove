import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import OneCell from './OneCell';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    dragSource: monitor.getItem()
  }
}

const targetSpecs = {
  canDrop() {
    return false;
  }
}

class OneCellWrapper extends Component {

  componentDidUpdate() {
    const { isOver, dragSource, cell } = this.props;
    if (isOver) {
      if (dragSource.id !== cell.id) {

      }
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <OneCell {...this.props} />
      </div>
    );
  }
}

export default DropTarget('cell', targetSpecs, collect)(OneCellWrapper);
