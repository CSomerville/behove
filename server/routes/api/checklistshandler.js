import { findChecklist, createChecklist, updateChecklist } from '../../../db/queries';

export function checklistsPost(req, res) {
  findChecklist(req.params.id)
    .then(() => {
      updateChecklist(req.body);
      res.sendStatus(200);
    }, () => {
      createChecklist(req.body);
      res.sendStatus(201);
    });
}
