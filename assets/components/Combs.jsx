import React, { Component } from 'react';

export default class Comb extends Component {
  render() {
    return (
      <ul>
        {this.props.combs.combs.map((comb, i) =>
          <li key={comb.id}>
            {!comb.editable &&
              <div>
                <h1>{comb.name}</h1>
                <button onClick={this.props.makeEditable.bind(this, comb, i)}>edit</button>
              </div>
            }
            {comb.editable &&
              <div>
                <input type="text" value={comb.name}
                  onChange={this.props.combInputChanged.bind(this, i)}
                  />
                <button onClick={this.props.cancelEdit.bind(this, i)}>cancel</button>
                <button onClick={this.props.saveEdit.bind(this, i, comb)}>save</button>
              </div>
            }
          </li>
        )}
      </ul>
    );
  }
}
