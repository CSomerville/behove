import express from 'express';
import bodyParser from 'body-parser';
import verifySession from '../utils/verifysession';
import { combsGet, combPost, combGet } from './combshandler';
import { combColPost, combColDelete } from './combcolshandler';
import { cellPost } from './cellhandler';

let apiRoutes = express.Router();

apiRoutes.use(bodyParser.json());
apiRoutes.use(verifySession);

apiRoutes.get('/combs', combsGet);
apiRoutes.get('/comb/:id', combGet);

apiRoutes.post('/comb', combPost);
apiRoutes.post('/col/:id', combColPost);
apiRoutes.post('/cell', cellPost);

apiRoutes.delete('/col/:id', combColDelete);

export default apiRoutes;
