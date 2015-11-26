import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Cells from './Cells';
import DropPlaceholder from './DropPlaceholder';
import { DragSource } from 'react-dnd';
import AddButton from './AddButton';

const colSource = {
  beginDrag(props) {
    return { id: props.col.id };
  },

  isDragging(props, monitor) {
    return props.col.id === monitor.getItem().id;
  },

  endDrag(props) {
    props.colDragEnded();
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    dragSource: monitor.getItem()
  }
}

export default class OneCol extends Component {

  componentDidUpdate() {
    if (this.props.col.editable) {
      findDOMNode(this.refs.editColName).focus();
    }
  }

  componentDidMount() {
    if (this.props.col.editable) {
      findDOMNode(this.refs.editColName).focus();
    }    
  }

  render() {
    const { connectDragSource, col, dragSource, connectDragPreview, isDragging, ind } = this.props;
    return connectDragSource(
      <div style={{opacity: (isDragging) ? 0 : 1}}>
        {connectDragPreview(
          <div className={(ind % 2 === 0) ? "hexagon even": "hexagon odd"}>

          {!col.editable &&
            <div>
              <h1 className="column-title">{col.name}</h1>
              <button className="edit-col"
                onClick={this.props.onEditClick.bind(this, col.id)}>
                edit
              </button>
            </div>
          }
          {col.editable &&
            <div className="editable-col">
              <input type="text" value={col.name}
                ref="editColName"
                onChange={this.props.onInputChange.bind(this, col.id)}
                />
              <button className="col-delete"
                onClick={this.props.onDeleteCol.bind(this, col.id)}>
                delete
              </button>
              <button className="col-cancel"
                onClick={this.props.onCancelCol.bind(this, col.id)}>
                cancel
              </button>
              <button className="col-save"
                onClick={this.props.onSaveClick.bind(this, col)}>
                save
              </button>
            </div>
          }
          </div>
        )}
        <Cells cells={col.cells}
          colInd={ind}
          cellDragEnded={this.props.cellDragEnded}
          triggerCellReorder={this.props.triggerCellReorder}
          triggerChangeCellName={this.props.triggerChangeCellName}
          triggerEditCell={this.props.triggerEditCell}
          triggerCancelEditCell={this.props.triggerCancelEditCell}
          triggerSaveCell={this.props.triggerSaveCell}
          triggerDeleteCell={this.props.triggerDeleteCell}/>
        {!col.cells.length &&
          <DropPlaceholder col={col}
            triggerInsert={this.props.triggerInsert} />
        }
        <div className={(col.cells.length % 2 === 0) ? "hexagon add even-cell" : "hexagon add"}>
          <AddButton buttonClass="new-cell"
            onAddClick={this.props.triggerNewCell.bind(this, col.id)}
            />
        </div>
      </div>
    );
  }
}

export default DragSource('col', colSource, collect)(OneCol);
