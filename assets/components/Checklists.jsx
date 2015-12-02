import React, { Component } from 'react';

export default class Checklists extends Component {
  render() {
    const { checklists, changeName, triggerSave, triggerEditable, triggerDelete,
      triggerCancel } = this.props;
    return (
      <div>
        <ul>
          {checklists.map((checklist, i) =>
            <li key={checklist.id}>
              {!checklist.editable &&
                <div>
                  <p>{checklist.name}</p>
                  <button className="checklist-edit"
                    onClick={triggerEditable.bind(this, checklist.id)}>
                    edit
                  </button>
                </div>
              }
              {checklist.editable &&
                <div>
                  <input type="text" value={checklist.name}
                    onChange={changeName.bind(this, checklist.id)}/>
                  <button className="checklist-item"
                    onClick={triggerDelete.bind(this, checklist.id)}>
                    delete
                  </button>
                  <button className="checklist-cancel"
                    onClick={triggerCancel.bind(this, checklist.id)}>
                    cancel
                  </button>
                  <button className="checklist-save"
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
