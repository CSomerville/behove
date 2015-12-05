import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChItems from '../components/ChItems';
import { changeChecklistItemName, initiateSaveChecklistItem } from '../actions/cell_actions';

export class ChItemsWrap extends Component {
  render() {
    const { dispatch, checklist, checklistItems } = this.props;
    return (
      <ChItems checklist={checklist}
        checklistItems={checklistItems}
        triggerChangeName={(id, e) => {
          dispatch(changeChecklistItemName(id, e));
        }}
        triggerSave={(checklistItem) => {
          dispatch(initiateSaveChecklistItem(checklistItem));
        }}
        />
    );
  }
}

function select(state) {
  return {
    checklistItems: state.cell.checklistItems
  }
}

export default connect(select)(ChItemsWrap);
