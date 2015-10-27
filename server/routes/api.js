import express from 'express';
import bodyParser from 'body-parser';
import { createComb } from '../../db/queries';

let apiRoutes = express.Router();

apiRoutes.use(bodyParser.json());
apiRoutes.use(verifySession);

function verifySession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

apiRoutes.post('comb', (req, res) => {
  createComb(req.session.user.id, req.body.name)
    .then((comb) => {
      res.send(JSON.stringify(comb));
    }, (err) => {
      res.sendStatus(500);
    });
});

export default apiRoutes;
