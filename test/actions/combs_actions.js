import { expect, assert } from 'chai';
import uuid from 'node-uuid';
import nock from 'nock';
import { newComb, editComb, cancelEditComb, editCombName, initiateFetchCombs, initiateSaveEditComb,
  NEW_COMB, EDIT_COMB, CANCEL_EDIT_COMB, EDIT_COMB_NAME, SAVE_EDIT_COMB,
  SAVE_EDIT_COMB_SUCCESS, SAVE_EDIT_COMB_FAILURE, FETCH_COMBS, FETCH_COMBS_SUCCESS,
  FETCH_COMBS_FAILURE
} from '../../assets/actions/combs_actions';
import mockStore from '../mockstore';

describe('combsActions', () => {

  describe('newComb', () => {
    it('should create new comb with uuid and blank name and editable boolean', () => {
      const expected = {
        type: NEW_COMB,
        comb: {
          id: uuid.v4(),
          name: '',
          editable: true
        }
      };
      expect(expected.type).to.equal(newComb().type);
      expect(expected.comb.id.length).to.equal(newComb().comb.id.length);
      expect(expected.comb.name).to.equal(newComb().comb.name);
      expect(expected.comb.editable).to.equal(newComb().comb.editable);
    });
  });

  describe('editComb', () => {
    it('should return EDIT_COMB and the correct index', () => {
      const expected = {
        type: EDIT_COMB,
        ind: 3
      };
      expect(editComb(3)).to.deep.equal(expected);
    });
    it('should throw TypeError if ind is not a number', () => {
      expect(editComb.bind(this, 'duh')).to.throw(TypeError);
      expect(editComb.bind(this, {})).to.throw(TypeError);
    });
  });

  describe('cancelEditComb', () => {
    it('should return CANCEL_EDIT_COMB and the correct index', () => {
      const expected = {
        type: CANCEL_EDIT_COMB,
        ind: 3
      };
      expect(cancelEditComb(3)).to.deep.equal(expected);
    });
    it('should throw TypeError if ind is not a number', () => {
      expect(cancelEditComb.bind(this, 'duh')).to.throw(TypeError);
      expect(cancelEditComb.bind(this, {})).to.throw(TypeError);
    });
  });

  describe('editCombName', () => {
    const ev = {
      target: {
        value: 'and then went down to the ship'
      }
    };

    it('should return EDIT_COMB_NAME, the correct index, and name', () => {
      const expected = {
        type: EDIT_COMB_NAME,
        ind: 3,
        name: 'and then went down to the ship'
      };

      expect(editCombName(3, ev)).to.deep.equal(expected);
    });
    it('should throw TypeError if ind is not a number', () => {
      expect(editCombName.bind(this, 'duh', ev)).to.throw(TypeError);
      expect(editCombName.bind(this, {}, ev)).to.throw(TypeError);
    });
  });

  describe('initiateFetchCombs', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('creates FETCH_COMBS_SUCCESS when fetching combs finishes', () => {

      const id = uuid.v4();

      nock('http://127.0.0.1:3000')
        .get('/api/combs')
        .reply(200, { combs: [{ id: id, user_id: 1, name: 'flambe' }]});

      const expectedActions = [
        { type: FETCH_COMBS },
        { type: FETCH_COMBS_SUCCESS, combs: { combs: [{ id: id, user_id: 1, name: 'flambe' }]}}
      ];

      const store = mockStore({ combs: [] }, expectedActions, (err) => {
        if (err) {
          console.log(err);
        }
      });
      store.dispatch(initiateFetchCombs('http://127.0.0.1:3000/'));
    });

    it('creates FETCH_COMBS_FAILURE if server fails to respond', (done) => {
      nock('http://127.0.0.1:3000')
        .get('/api/combs')
        .reply(500);

      const expectedActions = [
        { type: FETCH_COMBS },
        { type: FETCH_COMBS_FAILURE, msg: "Internal Server Error" }
      ];
      const store = mockStore({ combs: [] }, expectedActions, done);

      store.dispatch(initiateFetchCombs('http://127.0.0.1:3000/'));
    });
  });

  describe('initiateSaveEditComb', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call SAVE_EDIT_COMB_SUCCESS when posting finishes', (done) => {
      const id = uuid.v4();

      nock('http://127.0.0.1:3000')
        .post('/api/comb', {
          id: id,
          name: 'zo'
        })
        .reply(200);

      const expectedActions = [
        { type: SAVE_EDIT_COMB, ind: 3 },
        { type: SAVE_EDIT_COMB_SUCCESS, ind: 3}
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateSaveEditComb(3, { id: id, name: 'zo' }, 'http://127.0.0.1:3000/'));
    });

    it('should call SAVE_EDIT_COMB_FAILURE when server returns error status', (done) => {
      const id = uuid.v4();

      nock('http://127.0.0.1:3000')
        .post('/api/comb', {
          id: id,
          name: 'zo'
        })
        .reply(500);

      const expectedActions = [
        { type: SAVE_EDIT_COMB, ind: 3 },
        { type: SAVE_EDIT_COMB_FAILURE, ind: 3, msg: 'Internal Server Error' }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateSaveEditComb(3, { id: id, name: 'zo' }, 'http://127.0.0.1:3000/'));
    });
  });
});
