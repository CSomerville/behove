import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    dragSource: monitor.getItem()
  };
}

const targetSpecs = {
  canDrop() {
    return false;
  }
}

class DropPlaceholder extends Component {

  componentDidUpdate(prevProps) {
    const { isOver, col, dragSource, triggerInsert } = this.props;
    if (isOver && !prevProps.isOver) {
      // hacky, but prevents react dnd from complaining that the target is gone.
      setTimeout(() => {
        triggerInsert(dragSource.id, col.id);
      }, 100);
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={{height: '150px', backgroundColor: 'red'}} className="drop-placeholder"></div>
    );
  }
}

export default DropTarget('cell', targetSpecs, collect)(DropPlaceholder);
