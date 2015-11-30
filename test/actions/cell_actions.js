import { expect } from 'chai';
import uuid from 'node-uuid';
import nock from 'nock';

import { updateCellId, initiateFetchCell,
UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE
} from '../../assets/actions/cell_actions';
import mockStore from '../mockstore';

describe('cell actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('updateCellId', () => {
    it('should pass the id', () => {
      const id = uuid.v4();
      const expected = {
        type: UPDATE_CELL_ID,
        id: id
      };

      expect(updateCellId(id)).to.deep.equal(expected);
    });
  });

  describe('initiateFetchCell', () => {
    it('should call FETCH_CELL_SUCCESS on success', (done) => {
      const [id, colId] = [uuid.v4(), uuid.v4()];
      const cell = {
        id: id,
        combColId: colId,
        name: 'Daedalus',
        position: 0
      };

      nock('http://127.0.0.1:3000')
        .get('/api/cell/' + id)
        .reply(200, cell);

      const expectedActions = [
        { type: FETCH_CELL },
        { type: FETCH_CELL_SUCCESS, cell: cell }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateFetchCell(id, 'http://127.0.0.1:3000'));
    });

    it('should call FETCH_CELL_FAILURE on failure', (done) => {
      const id = uuid.v4();

      nock('http://127.0.0.1:3000')
        .get('/api/cell/' + id)
        .reply(500);

      const expectedActions = [
        { type: FETCH_CELL },
        { type: FETCH_CELL_FAILURE, msg: 'Internal Server Error' }
      ];
      
      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateFetchCell(id, 'http://127.0.0.1:3000'));

    });
  });
});
