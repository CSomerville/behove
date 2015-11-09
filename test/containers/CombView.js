import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import uuid from 'node-uuid';
import { CombView } from '../../assets/containers/CombView';
import * as combActions from '../../assets/actions/comb_actions';

chai.use(sinonChai);
const { renderIntoDocument } = TestUtils;

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
      const output = setup({ id: id, name: null, comb: [], isFetching: false, msg: '' });
      let dispatchSpy = output.props.dispatch;

      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0].toString()).to.equal(combActions.initiateFetchComb().toString());
    });
  });
});
