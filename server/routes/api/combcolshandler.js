import { findCombCol, createCombCol, updateCombCol } from '../../../db/queries';

export function combColPost(req, res) {
  findComb(req.body.id)
    .then(() => {
      updateCombCol(req.body);
      res.sendStatus(200);
    }, () => {
      createCombCol(req.body);
      res.sendStatus(201);
    });
}
