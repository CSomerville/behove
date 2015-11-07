import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import uuid from 'node-uuid';
import { CombsView } from '../../assets/containers/CombsView';
import * as combsActions from '../../assets/actions/combs_actions';

chai.use(sinonChai);
const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate,
  scryRenderedDOMComponentsWithClass } = TestUtils;

// utility function injects props, renders component, returns props and component
function setup(combs, isFetching, msg) {
  let props = {
    dispatch: sinon.stub(),
    combs: {
      combs: combs,
      isFetching: isFetching,
      msg: msg
    }
  };
  const component = renderIntoDocument(
    <CombsView {...props} />
  );

  return {
    props,
    component
  }
}

describe('CombsView', () => {

  describe('Combs', () => {
    it('renders no li elements if there are no combs in state', () => {
      const output = setup([], false, '');

      const lis = scryRenderedDOMComponentsWithTag(output.component, 'li');
      expect(lis.length).to.equal(0);
    });

    it('renders comb name correctly', () => {
      const id = uuid.v4();
      const output = setup([{id: id, name: 'hunh-her', editable: false}], false, '');

      const combTitles = scryRenderedDOMComponentsWithClass(output.component, 'comb-title');
      const lis = scryRenderedDOMComponentsWithTag(output.component, 'li');

      expect(lis.length).to.equal(1);
      expect(combTitles[0].textContent).to.equal('hunh-her');
    });

    it('edit button dispatches correctly', () => {
      const id = uuid.v4();
      const output = setup([{id: id, name: 'hunh-her', editable: false}], false, '');

      let dispatchSpy = output.props.dispatch;
      dispatchSpy.reset();

      const buttons = scryRenderedDOMComponentsWithTag(output.component, 'button');
      Simulate.click(buttons[0]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect(dispatchSpy.args[0][0]).to.deep.equal(combsActions.editComb(0));
    });
  });

  describe('NewComb', () => {
    it('creates new comb button', () => {
      const output = setup([], false, '');

      const buttons = scryRenderedDOMComponentsWithTag(output.component, 'button');
      expect(buttons[buttons.length - 1].textContent).to.equal('+');
    });

    it('new comb button calls dispatch correctly when clicked', () => {
      const output = setup([], false, '');
      let dispatchSpy = output.props.dispatch;
      dispatchSpy.reset();

      const buttons = scryRenderedDOMComponentsWithTag(output.component, 'button');
      Simulate.click(buttons[buttons.length - 1]);
      expect(dispatchSpy).to.have.been.calledOnce;
      expect((dispatchSpy.args[0][0])).to.have.keys(Object.keys(combsActions.newComb()));
      expect((dispatchSpy.args[0][0].type)).to.equal(combsActions.newComb().type);
    });
  });
});
