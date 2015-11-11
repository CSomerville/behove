import { expect } from 'chai';
import uuid from 'node-uuid';
import nock from 'nock';
import { initiateFetchComb, updateCombId, editCol, changeColName, cancelEditCol, initiateSaveEditCol,
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL, CHANGE_COL_NAME,
  CANCEL_EDIT_COL, SAVE_EDIT_COL, SAVE_EDIT_COL_SUCCESS, SAVE_EDIT_COL_FAILURE
} from '../../assets/actions/comb_actions';
import mockStore from '../mockstore';

describe('combActions', () => {
  describe('initiateFetchComb', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create FETCH_COMB_SUCCESS when fetch finishes', (done) => {
      const id = uuid.v4();
      const colId = uuid.v4();
      const cellId = uuid.v4();
      const comb = {
        id: id,
        combCols: [{
          id: colId,
          combId: id,
          name: 'pshaw',
          cells: [{
            id: cellId,
            combColId: colId,
            position: 0,
            name: 'unk'
          }]
        }]
      };

      nock('http://127.0.0.1:3000')
        .get('/api/comb/' + id)
        .reply(200, comb);

      const expectedActions = [
        { type: FETCH_COMB },
        { type: FETCH_COMB_SUCCESS, comb: comb }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateFetchComb(id, 'http://127.0.0.1:3000'));
    });

    it('should create FETCH_COMB_FAILURE when fetch fails', (done) => {
      const id = uuid.v4();
      nock('http://127.0.0.1:3000')
        .get('/api/comb/' + id)
        .reply(500);

      const expectedActions = [
        { type: FETCH_COMB },
        { type: FETCH_COMB_FAILURE, msg: 'Internal Server Error' }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateFetchComb(id, 'http://127.0.0.1:3000'));
    });
  });

  describe('updateCombId', () => {
    it('should update id', () => {
      const id = uuid.v4();
      const expected = {
        type: UPDATE_COMB_ID,
        id: id
      };

      expect(updateCombId(id)).to.deep.equal(expected);
    });
  });

  describe('editCol', () => {
    it('should pass id and correct action type', () => {
      const id = uuid.v4();
      const expected = {
        type: EDIT_COL,
        id: id
      };

      expect(editCol(id)).to.deep.equal(expected);
    });
  });

  describe('changeColName', () => {
    it('should pass id and name', () => {
      const id = uuid.v4();
      const ev = { target: { value: 'luxor' }};
      const expected = {
        type: CHANGE_COL_NAME,
        id: id,
        name: 'luxor'
      };

      expect(changeColName(id, ev)).to.deep.equal(expected);
    });
  });

  describe('cancelEditCol', () => {
    it('should pass in the id', () => {
      const id = uuid.v4();
      const expected = {
        type: CANCEL_EDIT_COL,
        id: id
      };

      expect(cancelEditCol(id)).to.deep.equal(expected);
    });
  });

  describe('saveEditCol', () => {
    it('should dispatch SAVE_EDIT_COL_SUCCESS on successful save', (done) => {
      const id = uuid.v4();
      const col = {
        id: id,
        name: 'hatshepsut',
        position: 0,
        cells: []
      };

      nock('http://127.0.0.1:3000')
        .post('/api/col/' + id, {
          id: col.id,
          name: col.name,
          position: col.position
        })
        .reply(200);

      const expectedActions = [
        { type: SAVE_EDIT_COL, id: id },
        { type: SAVE_EDIT_COL_SUCCESS, id: id }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateSaveEditCol(col, 'http://127.0.0.1:3000'))
    });
    it('should dispatch SAVE_EDIT_COL_FAILURE on failure', (done) => {
      const id = uuid.v4();
      const col = {
        id: id,
        name: 'hatshepsut',
        position: 0,
        cells: []
      };

      nock('http://127.0.0.1:3000')
        .post('/api/col/' + id, {
          id: col.id,
          name: col.name,
          position: col.position
        })
        .reply(500);

      const expectedActions = [
        { type: SAVE_EDIT_COL, id: id },
        { type: SAVE_EDIT_COL_FAILURE, id: id, msg: 'Internal Server Error'}
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateSaveEditCol(col, 'http://127.0.0.1:3000'))
    })
  });
});
