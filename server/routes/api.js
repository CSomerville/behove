import express from 'express';
import bodyParser from 'body-parser';
import { createComb } from '../../db/queries';

let apiRoutes = express.Router();

apiRoutes.use(bodyParser.json());

apiRoutes.post('comb', (req, res) => {
  createComb(req.session.user.id, req.body.name)
    .then(() => {

    })
});
