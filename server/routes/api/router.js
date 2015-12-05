import express from 'express';
import bodyParser from 'body-parser';
import verifySession from '../utils/verifysession';
import { combsGet, combPost, combGet } from './combshandler';
import { combColPost, combColsPost, combColDelete } from './combcolshandler';
import { cellGet, cellPost, cellsPost, cellDelete } from './cellhandler';
import { checklistsPost, checklistsDelete } from './checklistshandler'
import { checklistItemsPost, checklistItemsDelete } from './checklistitemshandler';

let apiRoutes = express.Router();

apiRoutes.use(bodyParser.json());
apiRoutes.use(verifySession);

apiRoutes.get('/combs', combsGet);
apiRoutes.get('/comb/:id', combGet);
apiRoutes.get('/cell/:id', cellGet);

apiRoutes.post('/comb', combPost);
apiRoutes.post('/col/:id', combColPost);
apiRoutes.post('/cols', combColsPost);
apiRoutes.post('/cell', cellPost);
apiRoutes.post('/cells', cellsPost);
apiRoutes.post('/checklist/:id', checklistsPost);
apiRoutes.post('/checklist-item/:id', checklistItemsPost);

apiRoutes.delete('/col/:id', combColDelete);
apiRoutes.delete('/cell', cellDelete);
apiRoutes.delete('/checklist/:id', checklistsDelete);
apiRoutes.delete('/checklist-item/:id', checklistItemsDelete);

export default apiRoutes;
