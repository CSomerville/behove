import express from 'express';
import bodyParser from 'body-parser';
import { userCombs, findComb, createComb, updateComb } from '../../db/queries';

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

console.log('in here');

apiRoutes.get('/combs', (req, res) => {
  userCombs(req.session.user.id)
    .then((combs) => {
      res.send(JSON.stringify(combs));
    }, (err) => {
      res.sendStatus(500);
    });
});

apiRoutes.post('/comb', (req, res) => {
  createComb(req.session.user.id, req.body.comb)
    .then(() => {
      res.sendStatus(200);
    }, (err) => {
      res.sendStatus(500);
    });
});

export default apiRoutes;
