import { expect } from 'chai';
import uuid from 'node-uuid';
import {
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE
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
});
