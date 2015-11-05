import { expect } from 'chai';
import uuid from 'node-uuid';
import combs from '../../assets/reducers/combs';
import {
  NEW_COMB, EDIT_COMB, CANCEL_EDIT_COMB, EDIT_COMB_NAME, SAVE_EDIT_COMB,
  SAVE_EDIT_COMB_SUCCESS, SAVE_EDIT_COMB_FAILURE, FETCH_COMBS, FETCH_COMBS_SUCCESS,
  FETCH_COMBS_FAILURE
} from '../../assets/actions/combs_actions';

describe('combs reducer', () => {

  describe('default state', () => {

    it('should return default state', () => {
      const input = [ undefined, {} ];
      const expected = { combs: [], isFetching: false, msg: '' }

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('new comb', () => {

    it('should add comb to combs array in state', () => {
      const id = uuid.v4();
      const input = [ undefined, {
        type: NEW_COMB,
        comb: {
          id: id,
          name: '',
          editable: true
        }
      }];

      const expected = {
        combs: [{
          id: id,
          name: '',
          editable: true
        }],
        isFetching: false,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('edit comb', () => {

    it('should render comb editable and preserve the previous name', () => {
      const id = uuid.v4();
      const input = [{
        combs: [{
          id: id,
          name: 'boozy'
        }],
        isFetching: false,
        msg: ''
      }, {
        type: EDIT_COMB,
        ind: 0
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'boozy',
          prevName: 'boozy',
          editable: true
        }],
        isFetching: false,
        msg: ''
      };
      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('cancel edit comb', () => {
    it('should set editable to false and restore prev name', () => {
      const id = uuid.v4();
      const input = [{
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: true
        }],
        isFetching: false,
        msg: ''
      }, {
        type: CANCEL_EDIT_COMB,
        ind: 0
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'boozy',
          prevName: 'boozy',
          editable: false
        }],
        isFetching: false,
        msg: ''
      };
      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('edit comb name', () => {
    it('should update comb name', () => {
      const id = uuid.v4();
      const input = [{
        combs: [{
          id: id,
          name: 'boozy',
          prevName: 'boozy',
          editable: true
        }],
        isFetching: false,
        msg: ''
      }, {
        type: EDIT_COMB_NAME,
        ind: 0,
        name: 'booz'
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'booz',
          prevName: 'boozy',
          editable: true
        }],
        isFetching: false,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('save edit comb', () => {
    it('should set editable to false isSaving to true', () => {
      const id = uuid.v4();
      const input = [{
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: true
        }],
        isFetching: false,
        msg: ''
      }, {
        type: SAVE_EDIT_COMB,
        ind: 0
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: false,
          isSaving: true
        }],
        isFetching: false,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('save edit comb success', () => {
    it('should set isSaving to false', () => {
      const id = uuid.v4();
      const input = [{
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: false,
          isSaving: true
        }],
        isFetching: false,
        msg: ''
      }, {
        type: SAVE_EDIT_COMB_SUCCESS,
        ind: 0
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: false,
          isSaving: false
        }],
        isFetching: false,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('save edit combs failure', () => {
    it('should set isSaving to false', () => {
      const id = uuid.v4();
      const input = [{
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: false,
          isSaving: true
        }],
        isFetching: false,
        msg: ''
      }, {
        type: SAVE_EDIT_COMB_FAILURE,
        ind: 0
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'boozie',
          prevName: 'boozy',
          editable: false,
          isSaving: false
        }],
        isFetching: false,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch combs', () => {
    it('should set isFetching to true', () => {
      const id = uuid.v4();
      const input = [{
        combs: [],
        isFetching: false,
        msg: ''
      }, {
        type: FETCH_COMBS
      }];

      const expected = {
        combs: [],
        isFetching: true,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch combs success', () => {
    it('should load combs and set isFetching to false', () => {
      const id = uuid.v4();
      const input = [{
        combs: [],
        isFetching: true,
        msg: ''
      }, {
        type: FETCH_COMBS_SUCCESS,
        combs: [{
          id: id,
          name: 'boozy'
        }]
      }];

      const expected = {
        combs: [{
          id: id,
          name: 'boozy'
        }],
        isFetching: false,
        msg: ''
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch combs failure', () => {
    it('should provide msg and set isFetching to false', () => {
      const id = uuid.v4();
      const input = [{
        combs: [],
        isFetching: true,
        msg: ''
      }, {
        type: FETCH_COMBS_FAILURE,
        msg: 'Internal server error'
      }];

      const expected = {
        combs: [],
        isFetching: false,
        msg: 'Internal server error'
      };

      expect(combs(...input)).to.deep.equal(expected);
    });
  });
});
