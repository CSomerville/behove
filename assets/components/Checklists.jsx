import React, { Component } from 'react';

export default class Checklists extends Component {
  render() {
    const { checklists, changeName } = this.props;
    return (
      <div>
        <ul>
          {checklists.map((checklist, i) =>
            <li key={checklist.id}>
              {!checklist.editable &&
                <h1>{checklist.name}</h1>
              }
              {checklist.editable &&
                <input type="text" value={checklist.name}
                  onChange={changeName.bind(this, checklist.id)}/>
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}
