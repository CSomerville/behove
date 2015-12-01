import { expect } from 'chai';
import uuid from 'node-uuid';
import {
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE, NEW_CHECKLIST, CHANGE_CHECKLIST_NAME
} from '../../assets/actions/cell_actions';
import cell from '../../assets/reducers/cell';

describe('cell reducer', () => {
  describe('default state', () => {
    it('should return default state', () => {
      const input = [undefined, {}];
      const expected = {
        id: null,
        name: null,
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('update cell id', () => {
    it('should update the state id correctly', () => {
      const [oldId, newId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: oldId,
        name: '',
        checklists: [],
        checklistItems: [],
        msg: ''
      }, {
        type: UPDATE_CELL_ID,
        id: newId
      }];

      const expected = {
        id: newId,
        name: '',
        checklists: [],
        checklistItems: [],
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch cell', () => {
    it('should add to isFetching integer', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: null,
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: FETCH_CELL
      }];

      const expected = {
        id: id,
        name: null,
        checklists: [],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch cell success', () => {
    it('should load cell name', () => {
      const [id, colId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: id,
        name: null,
        checklists: [],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      }, {
        type: FETCH_CELL_SUCCESS,
        cell: {
          id: id,
          combColId: colId,
          name: 'autumn',
          position: 0
        }
      }];

      const expected = {
        id: id,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch cell failure', () => {
    it('should set message and subtract from isFetching', () => {
      const [id, colId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: id,
        name: null,
        checklists: [],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      }, {
        type: FETCH_CELL_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: id,
        name: null,
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: 'Internal Server Error'
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('new checklist', () => {
    it('should append the new checklist to the checklists array and insert cellId', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: NEW_CHECKLIST,
        id: checklistId,
        name: '',
        editable: true
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: '',
          editable: true
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('change checklist name', () => {
    it('should update name of checklist', () => {
      const [cellId, cklistId1, cklistId2] = [uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: cklistId1,
          cellId: cellId,
          name: 'elm',
          editable: true
        }, {
          id: cklistId2,
          cellId: cellId,
          name: 'beech',
          editable: false
        }],
        checklistItems: []
      }, {
        type: CHANGE_CHECKLIST_NAME,
        id: cklistId1,
        name: 'olm'
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: cklistId1,
          cellId: cellId,
          name: 'olm',
          editable: true
        }, {
          id: cklistId2,
          cellId: cellId,
          name: 'beech',
          editable: false
        }],
        checklistItems: []
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });
});
