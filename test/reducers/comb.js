import { expect } from 'chai';
import uuid from 'node-uuid';
import {
  FETCH_COMB, FETCH_COMB_SUCCESS, FETCH_COMB_FAILURE, UPDATE_COMB_ID, EDIT_COL, CHANGE_COL_NAME,
  CANCEL_EDIT_COL, SAVE_EDIT_COL, SAVE_EDIT_COL_SUCCESS, SAVE_EDIT_COL_FAILURE, DELETE_COL,
  DELETE_COL_SUCCESS, DELETE_COL_FAILURE, NEW_COL, REORDER_COLS, UPDATE_COL_POS, SAVE_COL_POSES,
  SAVE_COL_POSES_SUCCESS, SAVE_COL_POSES_FAILURE, REORDER_CELLS, INSERT_IN_EMPTY_COL, UPDATE_CELL_POSES,
  NEW_CELL, CHANGE_CELL_NAME, EDIT_CELL, CANCEL_EDIT_CELL, SAVE_EDIT_CELL, SAVE_EDIT_CELL_SUCCESS,
  SAVE_EDIT_CELL_FAILURE, DELETE_CELL, DELETE_CELL_SUCCESS, DELETE_CELL_FAILURE
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

  describe('reorder cols', () => {
    it('should reorder the cols correctly', () => {
      const [combId, colId1, colId2, colId3] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
      const initialState = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          name: 'beech',
          cells: [],
          position: 0
        }, {
          id: colId2,
          name: 'elm',
          cells: [],
          position: 1
        }, {
          id: colId3,
          name: 'oak',
          cells: [],
          position: 2
        }],
        isFetching: false,
        msg: ''
      };

      let input = [initialState, {
        type: REORDER_COLS,
        sourceId: colId1,
        targetId: colId2
      }];

      expect(comb(...input).cols[0].id).to.equal(colId2);
      expect(comb(...input).cols[1].id).to.equal(colId1);
      expect(comb(...input).cols[2].id).to.equal(colId3);

      input = [initialState, {
        type: REORDER_COLS,
        sourceId: colId1,
        targetId: colId3
      }];

      expect(comb(...input).cols[0].id).to.equal(colId2);
      expect(comb(...input).cols[1].id).to.equal(colId3);
      expect(comb(...input).cols[2].id).to.equal(colId1);

      input = [initialState, {
        type: REORDER_COLS,
        sourceId: colId3,
        targetId: colId1
      }];

      expect(comb(...input).cols[0].id).to.equal(colId3);
      expect(comb(...input).cols[1].id).to.equal(colId1);
      expect(comb(...input).cols[2].id).to.equal(colId2);

      input = [initialState, {
        type: REORDER_COLS,
        sourceId: colId2,
        targetId: colId2
      }];

      expect(comb(...input).cols[0].id).to.equal(colId1);
      expect(comb(...input).cols[1].id).to.equal(colId2);
      expect(comb(...input).cols[2].id).to.equal(colId3);
    });
  });

  describe('update col position', () => {
    it('should take col index and correctly update position', () => {
      const [ combId, colId1, colId2 ] = [ uuid.v4(), uuid.v4(), uuid.v4() ];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          position: 1,
          cells: []
        }, {
          id: colId2,
          combId, combId,
          name: 'beech',
          position: 0,
          cells: []
        }]
      }, {
        type: UPDATE_COL_POS,
        ind: 0
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          position: 0,
          cells: []
        }, {
          id: colId2,
          combId, combId,
          name: 'beech',
          position: 0,
          cells: []
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('save col poses', () => {
    it('should set isfetching to true', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'autumn',
        cols: [],
        isFetching: false,
        msg: ''
      }, {
        type: SAVE_COL_POSES
      }];

      const expected = {
        id: id,
        name: 'autumn',
        cols: [],
        isFetching: true,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('save col poses success', () => {
    it('should set isFetching to false', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'autumn',
        cols: [],
        isFetching: true,
        msg: ''
      }, {
        type: SAVE_COL_POSES_SUCCESS
      }];

      const expected = {
        id: id,
        name: 'autumn',
        cols: [],
        isFetching: false,
        msg: ''
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('save col poses failure', () => {
    it('should set isFetching to false and set msg', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'autumn',
        cols: [],
        isFetching: true,
        msg: ''
      }, {
        type: SAVE_COL_POSES_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: id,
        name: 'autumn',
        cols: [],
        isFetching: false,
        msg: 'Internal Server Error'
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('reorder cells', () => {
    it('should reorder cells correctly', () => {
      const [combId, colId1, colId2, cellId1, cellId2, cellId3, cellId4] =
        [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];

      const initialState = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId1,
            name: 'nicobar pigeon'
          }, {
            id: cellId2,
            combColId: colId1,
            name: 'scarlet ibis'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId3,
            combColId: colId2,
            name: 'ruddy shelduck'
          }, {
            id: cellId4,
            combColId: colId2,
            name: 'mandarin duck'
          }]
        }]
      };
      let input = [initialState, {
        type: REORDER_CELLS,
        sourceId: cellId1,
        sourceColId: colId1,
        targetId: cellId4,
        targetColId: colId2
      }];

      let expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId2,
            combColId: colId1,
            name: 'scarlet ibis'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId3,
            combColId: colId2,
            name: 'ruddy shelduck'
          }, {
            id: cellId1,
            combColId: colId2,
            name: 'nicobar pigeon'
          }, {
            id: cellId4,
            combColId: colId2,
            name: 'mandarin duck'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);

      input = [initialState, {
        type: REORDER_CELLS,
        sourceId: cellId3,
        sourceColId: colId2,
        targetId: cellId1,
        targetColId: colId1
      }];

      expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId3,
            combColId: colId1,
            name: 'ruddy shelduck'
          }, {
            id: cellId1,
            combColId: colId1,
            name: 'nicobar pigeon'
          }, {
            id: cellId2,
            combColId: colId1,
            name: 'scarlet ibis'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId4,
            combColId: colId2,
            name: 'mandarin duck'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);

      input = [initialState, {
        type: REORDER_CELLS,
        sourceId: cellId4,
        sourceColId: colId2,
        targetId: cellId3,
        targetColId: colId2
      }];

      expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId1,
            name: 'nicobar pigeon'
          }, {
            id: cellId2,
            combColId: colId1,
            name: 'scarlet ibis'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId4,
            combColId: colId2,
            name: 'mandarin duck'
          }, {
            id: cellId3,
            combColId: colId2,
            name: 'ruddy shelduck'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);

      input = [initialState, {
        type: REORDER_CELLS,
        sourceId: cellId3,
        sourceColId: colId2,
        targetId: cellId4,
        targetColId: colId2
      }];

      expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId1,
            name: 'nicobar pigeon'
          }, {
            id: cellId2,
            combColId: colId1,
            name: 'scarlet ibis'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId4,
            combColId: colId2,
            name: 'mandarin duck'
          }, {
            id: cellId3,
            combColId: colId2,
            name: 'ruddy shelduck'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('insert in empty col', () => {
    it('should remove cell from source col and insert in target col', () => {
      const [combId, colId1, colId2, cellId1] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];

      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId1,
            combColId: colId1,
            name: 'rust-red'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'elm',
          cells: []
        }]
      }, {
        type: INSERT_IN_EMPTY_COL,
        sourceId: cellId1,
        targetColId: colId2
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          cells: []
        }, {
          id: colId2,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId2,
            name: 'rust-red'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });

    it('should work in both directions', () => {
      const [combId, colId1, colId2, cellId1] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];

      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          cells: []
        }, {
          id: colId2,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId2,
            name: 'rust-red'
          }]
        }]
      }, {
        type: INSERT_IN_EMPTY_COL,
        sourceId: cellId1,
        targetColId: colId1
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: colId1,
          combId: combId,
          name: 'beech',
          cells: [{
            id: cellId1,
            combColId: colId1,
            name: 'rust-red'
          }]
        }, {
          id: colId2,
          combId: combId,
          name: 'elm',
          cells: []
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('update cell poses', () => {
    it('should update the cell position attrs properly', () => {
      const [colId1, colId2, cellId1, cellId2, cellId3] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        cols: [{
          id: colId1,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId1,
            position: 1,
            name: 'stem'
          }]
        }, {
          id: colId2,
          name: 'beech',
          cells: [{
            id: cellId2,
            combColId: colId2,
            position: 0,
            name: 'leaf'
          }, {
            id: cellId3,
            combColId: colId2,
            position: 0,
            name: 'root'
          }]
        }]
      }, {
        type: UPDATE_CELL_POSES,
        sourceColId: colId1,
        sourceId: cellId2
      }];

      const expected = {
        cols: [{
          id: colId1,
          name: 'elm',
          cells: [{
            id: cellId1,
            combColId: colId1,
            position: 0,
            name: 'stem'
          }]
        }, {
          id: colId2,
          name: 'beech',
          cells: [{
            id: cellId2,
            combColId: colId2,
            position: 0,
            name: 'leaf'
          }, {
            id: cellId3,
            combColId: colId2,
            position: 1,
            name: 'root'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('newCell', () => {
    it('should insert a new cell in col and assign pos', () => {
      const [combId, combColId, cellId1, cellId2] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: combColId,
          name: 'elm',
          position: 0,
          combId: combId,
          cells: [{
            id: cellId1,
            name: 'leaf',
            combColId: combColId,
            position: 0
          }]
        }]
      }, {
        type: NEW_CELL,
        id: cellId2,
        combColId: combColId,
        editable: true,
        name: ''
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: combColId,
          name: 'elm',
          position: 0,
          combId: combId,
          cells: [{
            id: cellId1,
            name: 'leaf',
            combColId: combColId,
            position: 0
          }, {
            id: cellId2,
            combColId: combColId,
            editable: true,
            name: '',
            position: 1
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('change cell name', () => {
    it('should update name with new value', () => {
      const [colId, cellId] = [uuid.v4(), uuid.v4()];
      const input = [{
        cols: [{
          id: colId,
          name: 'beech',
          cells: [{
            id: cellId,
            editable: true,
            name: 'unk',
            prevName: 'unk'
          }]
        }]
      }, {
        type: CHANGE_CELL_NAME,
        id: cellId,
        name: 'unkk'
      }];

      const expected = {
        cols: [{
          id: colId,
          name: 'beech',
          cells: [{
            id: cellId,
            editable: true,
            name: 'unkk',
            prevName: 'unk'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);

    });
  });

  describe('edit cell', () => {
    it('should set editable to true and set prevName', () => {
      const [colId1, colId2, cellId1, cellId2] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        cols: [{
          id: colId1,
          name: 'beech',
          cells: [{
            id: cellId1,
            combColId: colId1,
            editable: false,
            name: 'leaf'
          }]
        }, {
          id: colId2,
          name: 'elm',
          cells: [{
            id: cellId2,
            combColId: colId2,
            editable: false,
            name: 'stem'
          }]
        }]
      }, {
        type: EDIT_CELL,
        id: cellId1
      }];

      const expected = {
        cols: [{
          id: colId1,
          name: 'beech',
          cells: [{
            id: cellId1,
            combColId: colId1,
            editable: true,
            name: 'leaf',
            prevName: 'leaf'
          }]
        }, {
          id: colId2,
          name: 'elm',
          cells: [{
            id: cellId2,
            combColId: colId2,
            editable: false,
            name: 'stem'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('cancel edit cell', () => {
    it('should set editable to false and restore previous name', () => {
      const [colId1, colId2, cellId1, cellId2] = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        cols: [{
          id: colId1,
          name: 'beech',
          cells: [{
            id: cellId1,
            combColId: colId1,
            editable: true,
            name: 'leaff',
            prevName: 'leaf'
          }]
        }, {
          id: colId2,
          name: 'elm',
          cells: [{
            id: cellId2,
            combColId: colId2,
            editable: false,
            name: 'stem'
          }]
        }]
      }, {
        type: CANCEL_EDIT_CELL,
        id: cellId1
      }];

      const expected = {
        cols: [{
          id: colId1,
          name: 'beech',
          cells: [{
            id: cellId1,
            combColId: colId1,
            editable: false,
            name: 'leaf',
            prevName: 'leaf'
          }]
        }, {
          id: colId2,
          name: 'elm',
          cells: [{
            id: cellId2,
            combColId: colId2,
            editable: false,
            name: 'stem'
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('save edit cell', () => {
    it('should set editable to false', () => {
      const [colId, cellId] = [uuid.v4(), uuid.v4()];
      const input = [{
        cols: [{
          id: colId,
          name: 'beech',
          cells: [{
            id: cellId,
            combColId: colId,
            name: 'leaff',
            prevName: 'leaf',
            editable: true
          }]
        }]
      }, {
        type: SAVE_EDIT_CELL,
        id: cellId
      }];

      const expected = {
        cols: [{
          id: colId,
          name: 'beech',
          cells: [{
            id: cellId,
            combColId: colId,
            name: 'leaff',
            prevName: 'leaf',
            editable: false
          }]
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('save edit cell success', () => {
    it('is a noop right now', () => {

    });
  });

  describe('save edit cell failure', () => {
    it('should set the msg', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'unk',
        cols: [],
        msg: ''
      }, {
        type: SAVE_EDIT_CELL_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: id,
        name: 'unk',
        cols: [],
        msg: 'Internal Server Error'
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('delete cell', () => {
    it('should remove cell by id', () => {
      const [combId, combColId, cellId] = [uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        id: combId,
        name: 'autumn',
        cols: [{
          id: combColId,
          combId: combId,
          name: 'elm',
          cells: [{
            id: cellId,
            combColId: combColId,
            name: 'leaf'
          }]
        }]
      }, {
        type: DELETE_CELL,
        id: cellId
      }];

      const expected = {
        id: combId,
        name: 'autumn',
        cols: [{
          id: combColId,
          combId: combId,
          name: 'elm',
          cells: []
        }]
      };

      expect(comb(...input)).to.deep.equal(expected);
    });
  });

  describe('delete cell success', () => {
    it('should be a noop', () => {

    });
  });

  describe('delete cell failure', () => {
    it('should set msg', () => {
      const id = uuid.v4();
      const input = [{
        id: id,
        name: 'autumn',
        cols: [],
        msg: ''
      }, {
        type: DELETE_CELL_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: id,
        name: 'autumn',
        cols: [],
        msg: 'Internal Server Error'
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
