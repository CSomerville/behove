import React, { Component } from 'react';

export default class ChItems extends Component {

  findItems() {
    const { checklist, checklistItems } = this.props;
    let acc = [];
    for (let item of checklistItems) {
      if (item.checklistId === checklist.id) {
        acc.push(item);
      }
    }
    return acc;
  }

  render() {
    const items = this.findItems();
    const { triggerChangeName, triggerSave, triggerEdit, triggerCancel, triggerDelete,
    triggerComplete } = this.props;
    return (
      <ul className="checklist-items">
        {items.map((item, i) =>
          <li key={item.id}>
            {!item.editable &&
            <div>
              <button className="toggle-item-complete"
                onClick={triggerComplete.bind(this, item.id)}>
                {(item.completed) ? 'x' : ''}
              </button>
              <p className={(item.completed) ? 'item-completed' : ''}
                onClick={triggerEdit.bind(this, item.id)}>
                {item.name}
              </p>
            </div>
            }
            {item.editable &&
              <div className="editable-checklist-item">
                <button className="toggle-item-complete"
                  onClick={triggerComplete.bind(this, item.id)}>
                  {(item.completed) ? 'x' : ''}
                </button>
                <input type="text"
                  value={item.name}
                  onChange={triggerChangeName.bind(this, item.id)} />
                <button className="delete-checklist-item"
                  onClick={triggerDelete.bind(this, item.id)}>
                  delete
                </button>
                <button className="cancel-checklist-item"
                  onClick={triggerCancel.bind(this, item.id)}>
                  cancel
                </button>
                <button className="save-checklist-item"
                  onClick={triggerSave.bind(this, item)}>
                  save
                </button>
              </div>
            }
          </li>
        )}
      </ul>
    );
  }
}
