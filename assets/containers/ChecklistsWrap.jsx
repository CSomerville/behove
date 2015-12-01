import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checklists from '../components/Checklists';
import { changeChecklistName, initiateSaveChecklist } from '../actions/cell_actions';

export class ChecklistsWrap extends Component {
  render() {
    const { dispatch, cell } = this.props;
    return (
      <Checklists
        checklists={cell.checklists}
        changeName={(id, e) => {
          dispatch(changeChecklistName(id, e));
        }}
        triggerSave={(checklist) => {
          dispatch(initiateSaveChecklist(checklist));
        }}
        />
    );
  }
}

function select(state) {
  return {
    cell: state.cell
  }
}

export default connect(select)(ChecklistsWrap);