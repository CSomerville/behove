import { expect } from 'chai';
import uuid from 'node-uuid';
import { FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID
 } from '../../assets/actions/comb_actions';
import comb from '../../assets/reducers/comb';

describe('combReducer', () => {
  describe('default state', () => {

    it('should return default state', () => {
      const input = [ undefined, {} ];
      const expected = {
        id: null,
        name: null,
        cols: [],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch comb', () => {
    it('should set fetching to true', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: null,
        cols: [],
        isFetching: false,
        msg: ''
      }, {
        type: FETCH_COMB
      }];

      const expected = {
        id: id,
        name: null,
        cols: [],
        isFetching: true,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch comb success', () => {
    it('should set name and cols, set isFetching to false', () =>  {
      const [ id, colId, cellId ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: id,
        name: null,
        cols: [],
        isFetching: true,
        msg: ''
      }, {
        type: FETCH_COMB_SUCCESS,
        comb: {
          id: id,
          name: 'Jack Spicer',
          cols: [{
            id: colId,
            combId: id,
            name: 'thing language',
            cells: [{
              id: cellId,
              colId: colId,
              name: 'ocean',
              position: 0,
            }]
          }]
        }
      }];

      const expected = {
        id: id,
        name: 'Jack Spicer',
        cols: [{
          id: colId,
          combId: id,
          name: 'thing language',
          cells: [{
            id: cellId,
            colId: colId,
            name: 'ocean',
            position: 0,
          }]
        }],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('fetch comb failure', () => {
    it('should set isFetching to false and set msg', () => {

      const id = uuid.v4();
      const input = [{
        id: id,
        name: null,
        cols: [],
        isFetching: true,
        msg: ''
      }, {
        type: FETCH_COMB_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: id,
        name: null,
        cols: [],
        isFetching: false,
        msg: 'Internal Server Error'
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('update comb id', () => {
    it('should update comb id', () => {
      const id = uuid.v4();
      const input = [{
        id: null,
        name: null,
        cols: [],
        isFetching: false,
        msg: ''
      }, {
        type: UPDATE_COMB_ID,
        id: id
      }];

      const expected = {
        id: id,
        name: null,
        cols: [],
        isFetching: false,
        msg: ''
      }

      expect(comb(...input)).to.deep.equal(expected);
    });
  });
});
