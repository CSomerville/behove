import React, { Component } from 'react';
import ChItemsWrap from '../containers/ChItemsWrap';

export default class Checklists extends Component {
  render() {
    const { checklists, changeName, triggerSave, triggerEditable, triggerDelete,
      triggerCancel, triggerNewItem } = this.props;
    return (
      <div>
        <ul>
          {checklists.map((checklist, i) =>
            <li key={checklist.id} className="checklist">
              {!checklist.editable &&
                <div>
                  <h2 className="checklist-name">{checklist.name}</h2>
                  <button className="edit-checklist"
                    onClick={triggerEditable.bind(this, checklist.id)}>
                    edit
                  </button>
                </div>
              }
              {checklist.editable &&
                <div className="editable-checklist">
                  <input type="text" value={checklist.name}
                    onChange={changeName.bind(this, checklist.id)}/>
                  <button className="delete-checklist"
                    onClick={triggerDelete.bind(this, checklist.id)}>
                    delete
                  </button>
                  <button className="cancel-checklist"
                    onClick={triggerCancel.bind(this, checklist.id)}>
                    cancel
                  </button>
                  <button className="save-checklist"
                    onClick={triggerSave.bind(this, checklist)}>
                    save
                  </button>
                </div>
              }
              <ChItemsWrap checklist={checklist} />
              <button className="add-checklist-item"
                onClick={triggerNewItem.bind(this, checklist.id)}>
                + item
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
