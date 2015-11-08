import { findCell, createCell, updateCell } from '../../db/queries';

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
