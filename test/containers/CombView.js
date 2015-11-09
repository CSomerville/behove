import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import uuid from 'node-uuid';
import { CombView } from '../../assets/containers/CombView';
import * as combActions from '../../assets/actions/comb_actions';

chai.use(sinonChai);
const { renderIntoDocument, scryRenderedDOMComponentsWithClass } = TestUtils;

function setup(data) {
  let props = {
    dispatch: sinon.stub(),
    comb: data
  }

  const component = renderIntoDocument(
    <CombView {...props} />
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

  describe('CombColumns', () => {
    it('should render list of comb columns', () => {
      const [combId, colId1, colId2] = [uuid.v4(), uuid.v4(), uuid.v4()];
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
