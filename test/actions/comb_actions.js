import { expect } from 'chai';
import uuid from 'node-uuid';
import nock from 'nock';
import { initiateFetchComb, updateCombId, editCol, changeColName, cancelEditCol, initiateSaveEditCol,
  initiateDeleteCol, newCol, reorderCols, initiateSaveColPoses,
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL, CHANGE_COL_NAME,
  CANCEL_EDIT_COL, SAVE_EDIT_COL, SAVE_EDIT_COL_SUCCESS, SAVE_EDIT_COL_FAILURE, DELETE_COL,
  DELETE_COL_SUCCESS, DELETE_COL_FAILURE, NEW_COL, REORDER_COLS, UPDATE_COL_POS, SAVE_COL_POSES,
  SAVE_COL_POSES_SUCCESS, SAVE_COL_POSES_FAILURE
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
  describe('initiateDeleteCol', () => {
    it('should dispatch DELETE_COL_SUCCESS on successful deletion', (done) => {
      const id = uuid.v4();

      nock('http://127.0.0.1:3000')
        .delete('/api/col/' + id)
        .reply(200);

      const expectedActions = [
        { type: DELETE_COL, id: id },
        { type: DELETE_COL_SUCCESS, id: id }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateDeleteCol(id, 'http://127.0.0.1:3000'));
    });
    it('should dispatch DELETE_COL_FAILURE and pass a message on failure', (done) => {
      const id = uuid.v4();

      nock('http://127.0.0.1:3000')
        .delete('/api/col/' + id)
        .reply(500);

      const expectedActions = [
        { type: DELETE_COL, id: id },
        { type: DELETE_COL_FAILURE, id: id, msg: 'Internal Server Error' }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateDeleteCol(id, 'http://127.0.0.1:3000'));
    });
  });

  describe('newCol', () => {
    it('should create a new col with id and editable true with combId passed in', () => {
      const [combId, colId] = [uuid.v4(), uuid.v4()];
      const expected = {
        type: NEW_COL,
        col: {
          id: colId,
          combId: combId,
          name: '',
          editable: true,
          cells: []
        }
      };

      expect(newCol(combId).type).to.equal(expected.type);
      expect(newCol(combId).col.id.length).to.equal(expected.col.id.length);
      expect(newCol(combId).col.combId).to.equal(expected.col.combId);
      expect(newCol(combId).col.name).to.equal(expected.col.name);
      expect(newCol(combId).col.editable).to.equal(expected.col.editable);
      expect(newCol(combId).col.cells).to.deep.equal(expected.col.cells);
    });
  });

  describe('reorderCols', () => {
    it('should pass in sourceId and targetId', () => {
      const [sourceId, targetId] = [uuid.v4(), uuid.v4()];
      const expected = {
        type: REORDER_COLS,
        sourceId: sourceId,
        targetId: targetId
      };

      expect(reorderCols(sourceId, targetId)).to.deep.equal(expected);
    });
  });

  describe('initiateSaveColPoses', () => {
    it('should dispatch SAVE_COL_POSES_SUCCESS on success', (done) => {
      const [id1, id2] = [uuid.v4(), uuid.v4()];
      const cols = [{
        id: id1,
        name: 'sure',
        position: 1
      }, {
        id: id2,
        name: 'nope',
        position: 0
      }];

      nock('http://127.0.0.1:3000')
        .post('/api/cols', cols)
        .reply(200);

      const expectedActions = [
        { type: UPDATE_COL_POS, col: cols[0], ind: 0 },
        { type: UPDATE_COL_POS, col: cols[1], ind: 1 },
        { type: SAVE_COL_POSES },
        { type: SAVE_COL_POSES_SUCCESS }
      ];

      const store = mockStore({cols: cols}, expectedActions, done);
      store.dispatch(initiateSaveColPoses(cols, 'http://127.0.0.1:3000'))
    });
  });
});
