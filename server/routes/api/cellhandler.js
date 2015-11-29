import { findCell, createCell, updateCell, updateCellPoses, deleteCell } from '../../../db/queries';

export function cellGet(req, res) {
  findCell(req.body.id)
    .then((cell) => {
      res.send(JSON.stringify(cell));
    }, (err) => {
      res.sendStatus(500);
    });
}

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

export function cellDelete(req, res) {
  deleteCell(req.body.id)
    .then(() => {
      res.sendStatus(200)
    }, (err) => {
      res.sendStatus(500)
    });
}
