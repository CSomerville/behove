import React, { Component } from 'react';
import OneCol from './OneCol';
import AddButton from '../components/AddButton';

export default class CombColumns extends Component {
  render() {
    let { comb, ...rest } = this.props;
    return (
      <ul style={{display: 'flex'}}>
        {this.props.comb.cols.map((col, i) =>
          <li key={col.id}>
            <OneCol col={col} { ...rest } />
          </li>
        )}
        <AddButton
          onAddClick={this.props.onAddCol.bind(this, comb.id)} 
          buttonClass='new-col' />
      </ul>
    );
  }
}
