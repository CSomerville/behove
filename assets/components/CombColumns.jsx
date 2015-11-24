import React, { Component } from 'react';
import OneColWrapper from './OneColWrapper';
import AddButton from '../components/AddButton';

export default class CombColumns extends Component {
  render() {
    let { comb, ...rest } = this.props;
    return (
      <ul style={{display: 'flex'}}>
        {this.props.comb.cols.map((col, i) =>
          <li key={i}>
            <OneColWrapper col={col} ind={i} { ...rest } />
          </li>
        )}
        <AddButton
          onAddClick={this.props.onAddCol.bind(this, comb.id)}
          buttonClass='new-col' />
      </ul>
    );
  }
}
