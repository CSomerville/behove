import { findCell, createCell, updateCell, updateCellPoses } from '../../../db/queries';

export function cellPost(req, res) {
  findCell(req.body.id)
    .then(() => {
      updateCell(req.body);
      res.sendStatus(200);
    }, () => {
      createCell(req.body);
      res.sendStatus(201);
    });
}

export function cellsPost(req, res) {
  updateCellPoses(req.body)
    .then(() => res.sendStatus(200),
      (err) => {
        res.sendStatus(500);
      });
}
