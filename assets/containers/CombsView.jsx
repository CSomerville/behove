import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchCombs, editComb, editCombName,
  cancelEditComb, newComb, initiateSaveEditComb } from '../actions/index';
import AddComb from '../components/AddComb';
import Combs from '../components/Combs';

class CombsView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initiateFetchCombs());
  }

  render() {
    const { dispatch, isEditing, name, combs } = this.props;
    return (
      <div>
        <Combs
          combs={combs}
          makeEditable={(comb, ind) => {
            dispatch(editComb(comb, ind));
          }}
          combInputChanged={(ind, e) => {
            dispatch(editCombName(ind, e));
          }}
          cancelEdit={(ind) => {
            dispatch(cancelEditComb(ind));
          }}
          saveEdit={(ind, comb) => {
            dispatch(initiateSaveEditComb(ind, comb));
          }}
          />
        <AddComb
          onAddCombClick={() => {
            dispatch(newComb());
          }}
          />
      </div>
    );
  }
}

function select(state) {
  return {
    combs: state.combs,
    isEditing: state.isEditing,
    name: state.name
  };
}

export default connect(select)(CombsView);
