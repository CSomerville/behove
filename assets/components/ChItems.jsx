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
    const { triggerChangeName, triggerSave, triggerEdit, triggerCancel, triggerDelete } = this.props;
    return (
      <ul>
        {items.map((item, i) =>
          <li key={item.id}>
            {!item.editable &&
            <div>
              <p>{item.name}</p>
              <button className="edit-checklist-item"
                onClick={triggerEdit.bind(this, item.id)}>
                edit
              </button>
            </div>
            }
            {item.editable &&
              <div>
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
