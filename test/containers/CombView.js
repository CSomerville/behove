import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React, { Component } from 'react';
import TestUtils from 'react-addons-test-utils';
import uuid from 'node-uuid';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import { CombView } from '../../assets/containers/CombView';
import * as combActions from '../../assets/actions/comb_actions';

chai.use(sinonChai);
const { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate,
  scryRenderedDOMComponentsWithTag } = TestUtils;

function wrapInDndCtx(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return (<DecoratedComponent {...this.props}/>);
      }
    }
  )
}

function setup(data) {
  const TestComb = wrapInDndCtx(CombView);

  let props = {
    dispatch: sinon.stub(),
    comb: data
  }

  const component = renderIntoDocument(
    <TestComb {...props} />
  );

  return {
    props,
    component
  }
}

describe('CombView', () => {
  describe('Component Did Mount', () => {
    it('should dispatch initiate fetch comb', () => {
      const id = uuid.v4();
      const output = setup({ id: id, name: null, cols: [], isFetching: false, msg: '' });
      let dispatchSpy = output.props.dispatch;

      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0].toString()).to.equal(combActions.initiateFetchComb().toString());
    });
  });

  describe('NewCol AddButton', () => {
    it('should render the button', () => {
      const id = uuid.v4();
      const output = setup({ id: id, name: null, cols: [], isFetching: false, msg: '' });

      const newColButtons = scryRenderedDOMComponentsWithClass(output.component, 'new-col');
      expect(newColButtons.length).to.equal(1);
      expect(newColButtons[0].textContent).to.equal('+');
    });

    it('should dispatch newCol with combId', () => {
      const id = uuid.v4();
      const output = setup({ id: id, name: null, cols: [], isFetching: false, msg: '' });
      let dispatchSpy = output.props.dispatch;
      dispatchSpy.reset();

      const newColButtons = scryRenderedDOMComponentsWithClass(output.component, 'new-col');
      Simulate.click(newColButtons[0]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0].type).to.equal(combActions.newCol(id).type);
      expect(dispatchSpy.args[0][0].col.name).to.equal(combActions.newCol(id).col.name);
      expect(dispatchSpy.args[0][0].col.combId).to.equal(combActions.newCol(id).col.combId);
      expect(dispatchSpy.args[0][0].col.editable).to.equal(combActions.newCol(id).col.editable);

    });
  });

  describe('CombColumns', () => {
    it('should render list of comb columns', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const output = setup({
        id: combId,
        name: 'everything',
        cols: [{
          id: colId1,
          name: 'Smell',
          cells: []
        }, {
          id: colId2,
          name: 'Smelled',
          cells: []
        }],
        isFetching: false,
        msg: ''
      });

      const columnTitles = scryRenderedDOMComponentsWithClass(output.component, 'column-title');
      expect(columnTitles.length).to.equal(2);
      expect(columnTitles[0].textContent).to.equal('Smell');
      expect(columnTitles[1].textContent).to.equal('Smelled');
    });

    it('should render an edit column button', () => {
      const [ combId, colId ] = [ uuid.v4(), uuid.v4() ];
      const output = setup({
        id: combId,
        name: 'studsy',
        cols: [{
          id: colId,
          combId: combId,
          name: 'sure',
          position: 0,
          cells: []
        }],
        isFetching: false,
        msg: ''
      });

      const editCol = scryRenderedDOMComponentsWithClass(output.component, 'edit-col');
      expect(editCol.length).to.equal(1);
      expect(editCol[0].textContent).to.equal('edit');

      let dispatchSpy = output.props.dispatch;
      dispatchSpy.reset();

      Simulate.click(editCol[0]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0]).to.deep.equal(combActions.editCol(colId));
    });

    it('should render editable col correctly', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const output = setup({
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          name: 'elm',
          prevName: 'elm',
          editable: true,
          position: 0,
          cells: []
        }, {
          id: colId2,
          name: 'beech',
          editable: false,
          position: 1,
          cells: []
        }]
      });

      const inputs = scryRenderedDOMComponentsWithTag(output.component, 'input');
      expect(inputs.length).to.equal(1);
      expect(inputs[0].value).to.equal('elm');

      const saveButton = scryRenderedDOMComponentsWithClass(output.component, 'col-save');
      expect(saveButton.length).to.equal(1);

      const cancelButton = scryRenderedDOMComponentsWithClass(output.component, 'col-cancel');
      expect(cancelButton.length).to.equal(1);

      const deleteButton = scryRenderedDOMComponentsWithClass(output.component, 'col-delete');
      expect(deleteButton.length).to.equal(1);
    });

    it('save, cancel and delete col buttons should dispatch correctly', () => {
      const [ combId, colId ] = [ uuid.v4(), uuid.v4() ];
      const output = setup({
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId,
          name: 'elm',
          prevName: 'elm',
          editable: true,
          position: 0,
          cells: []
        }]
      });

      let dispatchSpy = output.props.dispatch;
      dispatchSpy.reset();

      const saveButtons = scryRenderedDOMComponentsWithClass(output.component, 'col-save');
      Simulate.click(saveButtons[0]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0].toString()).to.equal(combActions.initiateSaveEditCol().toString());

      dispatchSpy.reset();
      const cancelButtons = scryRenderedDOMComponentsWithClass(output.component, 'col-cancel');
      Simulate.click(cancelButtons[0]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0]).to.deep.equal(combActions.cancelEditCol(colId));

      dispatchSpy.reset();
      const deleteButtons = scryRenderedDOMComponentsWithClass(output.component, 'col-delete');
      Simulate.click(deleteButtons[0]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0].toString()).to.equal(combActions.initiateDeleteCol().toString());
    });

    it('should create an empty drop target if no cells in col', () => {
      const [combId, colId] = [uuid.v4(), uuid.v4()];
      const output = setup({
        combId: combId,
        name: 'autumn',
        cols: [{
          id: colId,
          combId: combId,
          name: 'elm',
          cells: []
        }]
      });

      const dropTarget = scryRenderedDOMComponentsWithClass(output.component, 'drop-placeholder');
      expect(dropTarget.length).to.equal(1);
    });
  });

  describe('Cells', () => {
    it('should render a list of cells ordered by position', () => {
      const [ combId, colId, cellId1, cellId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4() ];
      const output = setup({
        id: combId,
        name: 'everything',
        cols: [{
          id: colId,
          combId: combId,
          name: 'Smell',
          cells: [{
            id: cellId1,
            colId: colId,
            name: 'hullo',
            position: 0,
          }, {
            id: cellId2,
            colId: colId,
            name: 'goodbye',
            position: 1
          }]
        }],
        isFetching: false,
        msg: ''
      });

      const cellTitles = scryRenderedDOMComponentsWithClass(output.component, 'cell-title');
      expect(cellTitles.length).to.equal(2);
      expect(cellTitles[0].textContent).to.equal('hullo');
      expect(cellTitles[1].textContent).to.equal('goodbye');
    });
  });
});
