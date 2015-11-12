import { expect } from 'chai';
import uuid from 'node-uuid';
import {
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL, CHANGE_COL_NAME,
  CANCEL_EDIT_COL, SAVE_EDIT_COL, SAVE_EDIT_COL_SUCCESS, SAVE_EDIT_COL_FAILURE, DELETE_COL,
  DELETE_COL_SUCCESS, DELETE_COL_FAILURE, NEW_COL
 } from '../../assets/actions/comb_actions';
import comb, { indexById } from '../../assets/reducers/comb';

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

  describe('edit col', () => {
    it('should make col editable by index and set prevName', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: combId,
        name: 'Tarkovsky',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'Bunuel',
          position: 0
        }, {
          id: colId2,
          combId: combId,
          name: 'Bresson',
          position: 1
        }],
        isFetching: false,
        msg: ''
      }, {
        type: EDIT_COL,
        id: colId2
      }];

      const expected = {
        id: combId,
        name: 'Tarkovsky',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'Bunuel',
          position: 0,
        }, {
          id: colId2,
          combId: combId,
          name: 'Bresson',
          prevName: 'Bresson',
          position: 1,
          editable: true
        }],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });
  describe('changeColName', () => {
    it('should update name of correct column', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          prevName: 'elm',
          position: 0,
          cells: [],
          editable: true
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          position: 1,
          cells: 0
        }],
        isFetching: false,
        msg: ''
      }, {
        type: CHANGE_COL_NAME,
        id: colId1,
        name: 'olm'
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'olm',
          prevName: 'elm',
          position: 0,
          cells: [],
          editable: true
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          position: 1,
          cells: 0
        }],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('cancel edit col', () => {
    it('should restore the previous name and make editable false', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          name: 'olmus',
          prevName: 'elm',
          editable: true,
          cells: []
        }, {
          id: colId2,
          name: 'beech',
          editable: false,
          cells: []
        }],
        isFetching: false,
        msg: ''
      }, {
        type: CANCEL_EDIT_COL,
        id: colId1
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          name: 'elm',
          prevName: 'elm',
          editable: false,
          cells: []
        }, {
          id: colId2,
          name: 'beech',
          editable: false,
          cells: []
        }],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('save edit col', () => {
    it('sets editable to false and sets isFetching to true', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'olmus',
          prevName: 'elm',
          editable: true
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          prevName: 'beec',
          editable: true
        }]
      }, {
        type: SAVE_EDIT_COL,
        id: colId2
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'olmus',
          prevName: 'elm',
          editable: true
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          prevName: 'beec',
          editable: false,
          isFetching: true
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });

    describe('save edit col success', () => {
      it('should set isFetching to false', () => {
        const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
        const input = [{
          id: combId,
          name: 'autumn',
          cols: [{
            id: colId1,
            combId: combId,
            name: 'olmus',
            prevName: 'elm',
            editable: true
          }, {
            id: colId2,
            combId: combId,
            name: 'beech',
            prevName: 'beec',
            editable: false,
            isFetching: true
          }]
        }, {
          type: SAVE_EDIT_COL_SUCCESS,
          id: colId2
        }];

        const expected = {
          id: combId,
          name: 'autumn',
          cols: [{
            id: colId1,
            combId: combId,
            name: 'olmus',
            prevName: 'elm',
            editable: true
          }, {
            id: colId2,
            combId: combId,
            name: 'beech',
            prevName: 'beec',
            editable: false,
            isFetching: false
          }]
        };

        expect(comb(...input)).to.deep.equal(expected);
      });
    });

    describe('save edit comb failure', () => {
      it('should set msg and isFetching to false', () => {
        const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
        const input = [{
          id: combId,
          name: 'autumn',
          cols: [{
            id: colId1,
            combId: combId,
            name: 'olmus',
            prevName: 'elm',
            editable: true
          }, {
            id: colId2,
            combId: combId,
            name: 'beech',
            prevName: 'beec',
            editable: false,
            isFetching: true
          }]
        }, {
          type: SAVE_EDIT_COL_FAILURE,
          id: colId2,
          msg: 'Internal Server Error'
        }];

        const expected = {
          id: combId,
          name: 'autumn',
          cols: [{
            id: colId1,
            combId: combId,
            name: 'olmus',
            prevName: 'elm',
            editable: true
          }, {
            id: colId2,
            combId: combId,
            name: 'beech',
            prevName: 'beec',
            editable: false,
            isFetching: false
          }],
          msg: 'Internal Server Error'
        };
        expect(comb(...input)).to.deep.equal(expected);
      });
    });
  });

  describe('Delete col', () => {
    it('should remove col from array and set isFetching to true', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          position: 0,
          cells: []
        }, {
          id: colId2,
          combId: combId,
          name: 'elm',
          position: 1,
          cells: []
        }],
        isFetching: false,
      }, {
        type: 'DELETE_COL',
        id: colId2
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          position: 0,
          cells: []
        }],
        isFetching: true
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('delete col success', () => {
    it('should set isFetching to false', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'autumn',
        cells: [],
        isFetching: true,
        msg: ''
      }, {
        type: DELETE_COL_SUCCESS,
        id: id
      }];

      const expected = {
        id: id,
        name: 'autumn',
        cells: [],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('delete col failure', () => {
    it('should set isFetching to false and set msg', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'autumn',
        cells: [],
        isFetching: true,
        msg: 'Internal Server Error'
      }, {
        type: DELETE_COL_FAILURE,
        id: id,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: id,
        name: 'autumn',
        cells: [],
        isFetching: false,
        msg: 'Internal Server Error'
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('new col', () => {
    it('should add new col to cols arr', () => {
      const [combId, colId1, colId2] = [uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          position: 0,
          cells: []
        }],
        isFetching: false
      }, {
        type: NEW_COL,
        col: {
          id: colId2,
          combId: combId,
          editable: true,
          cells: [],
          name: ''
        }
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          position: 0,
          cells: []
        }, {
          id: colId2,
          combId: combId,
          editable: true,
          cells: [],
          name: '',
          position: 1
        }],
        isFetching: false
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('indexById', () => {
    it('should return correct index or false', () => {
      const [ colId1, colId2 ] = [ uuid.v4(), uuid.v4() ]
      const cols = [{
        id: colId1,
        name: 'ok',
        position: 0
      }, {
        id: colId2,
        name: 'yes',
        position: 0
      }];

      expect(indexById(cols, colId1)).to.equal(0);
      expect(indexById(cols, colId2)).to.equal(1);
      expect(indexById(cols, uuid.v4())).to.be.false;

      const [ colId, cellId1, cellId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const colWithCells = [{
        id: colId,
        name: 'ok',
        position: 0,
        cells: [{
          id: cellId1,
          colId: colId,
          name: 'elm',
          position: 0,
        }, {
          id: cellId2,
          colId: colId,
          name: 'oak',
          position: 1
        }]
      }];

      expect(indexById(colWithCells, colId, cellId1)).to.deep.equal([0,0]);
      expect(indexById(colWithCells, colId, cellId2)).to.deep.equal([0,1]);
      expect(indexById(colWithCells, colId, uuid.v4())).to.be.false;
    });
  });
});
