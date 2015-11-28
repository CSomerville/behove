import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import AddButton from './AddButton';

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
    const { connectDropTarget, col } = this.props;
    return connectDropTarget(
      <div className={(col.cells.length % 2 === 0) ? "hexagon add even-cell" : "hexagon add"}>
        <AddButton buttonClass="new-cell"
          onAddClick={this.props.triggerNewCell.bind(this, col.id)}
          />
      </div>
    );
  }
}

export default DropTarget('cell', targetSpecs, collect)(DropPlaceholder);
