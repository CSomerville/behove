import { expect } from 'chai';
import uuid from 'node-uuid';
import {
  UPDATE_CELL_ID, FETCH_CELL, FETCH_CELL_SUCCESS, FETCH_CELL_FAILURE, NEW_CHECKLIST, CHANGE_CHECKLIST_NAME,
  SAVE_CHECKLIST, SAVE_CHECKLIST_SUCCESS, SAVE_CHECKLIST_FAILURE, EDIT_CHECKLIST, DELETE_CHECKLIST,
  DELETE_CHECKLIST_SUCCESS, DELETE_CHECKLIST_FAILURE, CANCEL_EDIT_CHECKLIST, NEW_CHECKLIST_ITEM,
  CHANGE_CHECKLIST_ITEM_NAME
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
          checklists: [],
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

  describe('save checklist', () => {
    it('should add to isFetching total and set editable to false', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton',
          editable: true
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: SAVE_CHECKLIST,
        id: checklistId
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton',
          editable: false
        }],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });
  describe('save checklist success', () => {
    it('should remove from isFetching total', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton'
        }],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      }, {
        type: SAVE_CHECKLIST_SUCCESS
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton'
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('save checklist failure', () => {
    it('should remove from isFetching total and set msg', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton'
        }],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      }, {
        type: SAVE_CHECKLIST_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton'
        }],
        checklistItems: [],
        isFetching: 0,
        msg: 'Internal Server Error'
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('edit checklist', () => {
    it('should set editable to true and set prevName', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton'
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: EDIT_CHECKLIST,
        id: checklistId
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton',
          editable: true,
          prevName: 'plankton'
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('delete checklist', () => {
    it('should add to isFetching and remove checklist from array', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'plankton',
          editable: true,
          prevName: 'plankton'
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: DELETE_CHECKLIST,
        id: checklistId
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('delete checklist success', () => {
    it('should reduce isFetching', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      }, {
        type: DELETE_CHECKLIST_SUCCESS
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('delete checklist failure', () => {
    it('should reduce isFetching and set msg', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 1,
        msg: ''
      }, {
        type: DELETE_CHECKLIST_FAILURE,
        msg: 'Internal Server Error'
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [],
        isFetching: 0,
        msg: 'Internal Server Error'
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });
  describe('cancel edit checklist', () => {
    it('should restore prev name and set editable to false', () => {
      const [cellId, checklistId] = [uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'olm',
          prevName: 'elm',
          editable: true
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: CANCEL_EDIT_CHECKLIST,
        id: checklistId
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'elm',
          prevName: 'elm',
          editable: false
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('new checklist item', () => {
    it('should assign id, checklistId, name, prevName, editable, and completed', () => {
      const [cellId, checklistId, checklistItemId] = [uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'elm'
        }],
        checklistItems: [],
        isFetching: 0,
        msg: ''
      }, {
        type: NEW_CHECKLIST_ITEM,
        checklistId: checklistId,
        id: checklistItemId
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [{
          id: checklistId,
          cellId: cellId,
          name: 'elm'
        }],
        checklistItems: [{
          id: checklistItemId,
          checklistId: checklistId,
          name: '',
          prevName: '',
          editable: true,
          completed: false
        }],
        isFetching: 0,
        msg: ''
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });

  describe('change checklist item name', () => {
    it('given the id and name, should update name of checklist item', () => {
      const [cellId, checklistId, checklistItemId] = [uuid.v4(), uuid.v4(), uuid.v4()];
      const input = [{
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [{
          id: checklistItemId,
          checklistId: checklistId,
          name: 'leaf',
          prevName: 'leaf',
          completed: false,
          editable: true
        }]
      }, {
        type: CHANGE_CHECKLIST_ITEM_NAME,
        id: checklistItemId,
        name: 'leaff'
      }];

      const expected = {
        id: cellId,
        name: 'autumn',
        checklists: [],
        checklistItems: [{
          id: checklistItemId,
          checklistId: checklistId,
          name: 'leaff',
          prevName: 'leaf',
          completed: false,
          editable: true
        }],
      };

      expect(cell(...input)).to.deep.equal(expected);
    });
  });
});
