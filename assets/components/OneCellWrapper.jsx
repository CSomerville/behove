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

  componentDidUpdate(prevProps) {
    const { isOver, dragSource, cell, triggerCellReorder } = this.props;
    if (isOver && !prevProps.isOver) {
      if (dragSource.id !== cell.id) {
        triggerCellReorder(dragSource.id, dragSource.colId, cell.id, cell.combColId);
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
