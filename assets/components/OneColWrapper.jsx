import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import OneCol from './OneCol';

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

class OneColWrapper extends Component {

  componentDidUpdate() {
    const { isOver, triggerReorder, dragSource, col } = this.props;
    if (isOver) {
      if (dragSource.id !== col.id) {
        triggerReorder(dragSource.id, col.id);
      }
    }
  }

  render() {
    const { connectDropTarget, dragSource, isOver, ...rest } = this.props;
    return connectDropTarget(
      <div style={{width: '200px'}}>
        <OneCol { ...rest } />
      </div>
    );
  }
}

export default DropTarget('col', targetSpecs, collect)(OneColWrapper);
