import { userCombs, findComb, createComb, updateComb } from '../../../db/queries';

export function combsGet(req, res) {
  userCombs(req.session.user.id)
    .then((combs) => {
      res.send(JSON.stringify(combs));
    }, (err) => {
      res.sendStatus(500);
    });
}

export function combPost(req, res) {
  findComb(req.body.id)
    .then(() => {
      updateComb(req.body);
      res.sendStatus(200);
    }, () => {
      createComb(req.session.user.id, req.body);
      res.sendStatus(200);
    });
}
