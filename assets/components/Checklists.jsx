import React, { Component } from 'react';

export default class Checklists extends Component {
  render() {
    const { checklists, changeName, triggerSave, triggerEditable, triggerDelete,
      triggerCancel } = this.props;
    return (
      <div>
        <ul>
          {checklists.map((checklist, i) =>
            <li key={checklist.id} className="checklist">
              {!checklist.editable &&
                <div>
                  <p className="checklist-name">{checklist.name}</p>
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
            </li>
          )}
        </ul>
      </div>
    );
  }
}
