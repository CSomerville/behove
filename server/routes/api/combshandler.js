import { userCombs, findComb, createComb, updateComb, getOneComb } from '../../../db/queries';

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
      res.sendStatus(201);
    });
}

export function combGet(req, res) {
  getOneComb(req.params.id)
    .then((comb) => {
      res.send(JSON.stringify(comb));
    })
    .catch((err) => {
      res.sendStatus(500);
    });
}
