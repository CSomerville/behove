import { findChecklist, createChecklist, updateChecklist, deleteChecklist } from '../../../db/queries';

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

export function checklistsDelete(req, res) {
  deleteChecklist(req.params.id)
    .then(() => {
      res.sendStatus(200)
    }, () => {
      res.sendStatus(500)
    });
}
