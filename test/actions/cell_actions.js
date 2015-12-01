import { expect } from 'chai';
import uuid from 'node-uuid';
import nock from 'nock';

import { updateCellId, initiateFetchCell, newChecklist, changeChecklistName, initiateSaveChecklist,
  editChecklist,
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE, NEW_CHECKLIST, CHANGE_CHECKLIST_NAME,
  SAVE_CHECKLIST, SAVE_CHECKLIST_SUCCESS, SAVE_CHECKLIST_FAILURE, EDIT_CHECKLIST
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

  describe('newChecklist', () => {
    it('should create id, empty name field and set editable to true', () => {
      const id = uuid.v4();
      const expected = {
        type: NEW_CHECKLIST,
        id: id,
        name: '',
        editable: true
      };

      expect(newChecklist().type).to.equal(expected.type);
      expect(newChecklist().id.length).to.equal(expected.id.length);
      expect(newChecklist().name).to.equal(expected.name);
      expect(newChecklist().editable).to.equal(expected.editable);
    });
  });

  describe('changeChecklistName', () => {
    it('should pass the id and value', () => {
      const id = uuid.v4();
      const ev = { target: { value: 'elm' }};
      const expected = {
        type: CHANGE_CHECKLIST_NAME,
        id: id,
        name: 'elm'
      };

      expect(changeChecklistName(id, ev)).to.deep.equal(expected);
    });
  });

  describe('initiateSaveChecklist', () => {
    it('should return SUCCESS on success', (done) => {
      const id = uuid.v4();
      const checklist = {
        id: id,
        name: 'plankton'
      };

      nock('http://127.0.0.1:3000')
        .post('/api/checklist/' + id, checklist)
        .reply(200)

      const expectedActions = [
        { type: SAVE_CHECKLIST, id: id },
        { type: SAVE_CHECKLIST_SUCCESS }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateSaveChecklist(checklist, 'http://127.0.0.1:3000'));
    });
    it('should return FAILURE with message', (done) => {
      const id = uuid.v4();
      const checklist = {
        id: id,
        name: 'plankton'
      };

      nock('http://127.0.0.1:3000')
        .post('/api/checklist/' + id, checklist)
        .reply(500)

      const expectedActions = [
        { type: SAVE_CHECKLIST, id: id },
        { type: SAVE_CHECKLIST_FAILURE, msg: 'Internal Server Error' }
      ];

      const store = mockStore({}, expectedActions, done);
      store.dispatch(initiateSaveChecklist(checklist, 'http://127.0.0.1:3000'));
    });
  });

  describe('editChecklist', () => {
    it('should pass action type and id', () => {
      const id = uuid.v4();
      const expected = {
        type: EDIT_CHECKLIST,
        id: id
      };

      expect(editChecklist(id)).to.deep.equal(expected);
    });
  });
});
