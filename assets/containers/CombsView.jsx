import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchCombs, editComb, editCombName,
  cancelEditComb, newComb, initiateSaveEditComb } from '../actions/combs_actions';
import { updateCombId } from '../actions/comb_actions';
import AddComb from '../components/AddButton';
import Combs from '../components/Combs';

// exports unconnected class for unit testing purposes
export class CombsView extends Component {
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
          makeEditable={(ind, e) => {
            e.stopPropagation();
            dispatch(editComb(ind));
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
          handleLinkClick={(id) => {
            dispatch(updateCombId(id));
          }}
          />
        <AddComb
          onAddClick={() => {
            dispatch(newComb());
          }}
          />
      </div>
    );
  }
}

function select(state) {
  return {
    combs: state.combs
  };
}

// exports connection to redux store
export default connect(select)(CombsView);
