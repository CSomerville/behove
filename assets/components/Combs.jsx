import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Comb extends Component {
  render() {
    return (
      <ul>
        {this.props.combs.combs.map((comb, i) =>
          <li key={comb.id}>
            {!comb.editable &&
              <Link to={'/app/comb/' + comb.id}>
                <h1 className="comb-title">{comb.name}</h1>
                <button onClick={this.props.makeEditable.bind(this, i)}>edit</button>
              </Link>
            }
            {comb.editable &&
              <div>
                <input type="text" value={comb.name}
                  onChange={this.props.combInputChanged.bind(this, i)}
                  />
                <button
                  className="cancel-edit-comb"
                  onClick={this.props.cancelEdit.bind(this, i)}>cancel</button>
                <button
                  className="save-edit-comb"
                  onClick={this.props.saveEdit.bind(this, i, comb)}>save</button>
              </div>
            }
          </li>
        )}
      </ul>
    );
  }
}
