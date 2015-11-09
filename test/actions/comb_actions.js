import { expect } from 'chai';
import uuid from 'node-uuid';
import nock from 'nock';
import { initiateFetchComb,
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE
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
        { type: FETCH_COMB, id: id },
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
        { type: FETCH_COMB, id: id },
        { type: FETCH_COMB_FAILURE, msg: 'Internal Server Error' }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateFetchComb(id, 'http://127.0.0.1:3000'));
    });
  });
});
