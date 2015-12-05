import { findChecklistItem, createChecklistItem, updateChecklistItem, deleteChecklistItem
  } from '../../../db/queries';

export function checklistItemsPost(req, res) {
  findChecklistItem(req.params.id)
    .then(() => {
      updateChecklistItem(req.body);
      res.sendStatus(200);
    }, () => {
      createChecklistItem(req.body);
      res.sendStatus(201);
    });
}

export function checklistItemsDelete(req, res) {
  deleteChecklistItem(req.params.id)
    .then(() => {
      res.sendStatus(200);
    }, (err) => {
      res.sendStatus(500);
    });
}
