import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import classNames from 'classNames';

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

  componentDidUpdate(prevProps) {
    if (!prevProps.cell.editable && this.props.cell.editable) {
      findDOMNode(this.refs.editCellName).focus();
    }
  }

  componentDidMount() {
    if (this.props.cell.editable) {
      findDOMNode(this.refs.editCellName).focus();
    }
  }

  render() {
    const { cell, connectDragSource, isDragging, triggerChangeCellName, colInd, ind } = this.props;

    const cellClass = classNames({
      'hexagon': true,
      'even': (colInd % 2 === 0),
      'odd': (colInd % 2 !== 0),
      'even-cell': (ind % 2 === 0),
      'odd-cell': (ind % 2 !== 0)
    })

    return connectDragSource(
      <div style={{opacity: (isDragging) ? 0 : 1}}
        className={cellClass}>
        {!cell.editable &&
          <div>
            <div className="holds-cell-title">
              <h1 className="cell-title">{cell.name}</h1>              
            </div>
            <button className="edit-cell"
              onClick={this.props.triggerEditCell.bind(this, cell.id)}>
              edit
            </button>
          </div>
        }
        {cell.editable &&
          <div className="editable-cell">
            <input type="text" value={cell.name}
              ref="editCellName"
              onChange={triggerChangeCellName.bind(this, cell.id)}/>
            <button className="delete-cell"
              onClick={this.props.triggerDeleteCell.bind(this, cell.id)}>
              delete
            </button>
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
