import { findCombCol, createCombCol, updateCombCol, deleteCol, updateColPoses
 } from '../../../db/queries';

export function combColPost(req, res) {
  findCombCol(req.body.id)
    .then(() => {
      updateCombCol(req.body)
        .then(() => { res.sendStatus(200) })
        .catch(() => { res.sendStatus(500) })
    }, () => {
      createCombCol(req.body)
        .then(() => { res.sendStatus(201) })
        .catch(() => { res.sendStatus(500) })
    });
}

export function combColsPost(req, res) {
  updateColPoses(req.body)
    .then(() => { res.sendStatus(200) })
    .catch(() => { res.sendStatus(500) });
}

export function combColDelete(req, res) {
  deleteCol(req.params.id)
    .then(() => {
      res.sendStatus(200);
    }, (err) => {
      console.log(err);
      res.sendStatus(500);
    });
}
