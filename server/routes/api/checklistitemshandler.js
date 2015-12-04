import { findChecklistItem, createChecklistItem, updateChecklistItem } from '../../../db/queries';

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
