import React, { Component } from 'react';

export default class Checklists extends Component {
  render() {
    const { checklists, changeName, triggerSave } = this.props;
    return (
      <div>
        <ul>
          {checklists.map((checklist, i) =>
            <li key={checklist.id}>
              {!checklist.editable &&
                <h1>{checklist.name}</h1>
              }
              {checklist.editable &&
                <div>
                  <input type="text" value={checklist.name}
                    onChange={changeName.bind(this, checklist.id)}/>
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
