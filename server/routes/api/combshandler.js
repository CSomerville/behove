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
      res.send(JSON.stringify(nestCombData(comb)));
    })
    .catch((err) => {
      res.sendStatus(500);
    });
}

function indexById(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return false;
}

function nestCombData(comb) {
  let formatted = [];
  comb.forEach((el, i) => {
    let inFormatted = indexById(el.id, formatted);
    if (inFormatted === 0 || inFormatted) {
      formatted[inFormatted].cells.push({
        id: el.cell_id,
        combColId: el.comb_col_id,
        position: el.position,
        name: el.cell_name
      });
    } else {
      formatted.push({
        id: el.id,
        combId: el.comb_id,
        name: el.name,
        cells: []
      });
      formatted[formatted.length - 1].cells.push({
        id: el.cell_id,
        combColId: el.comb_col_id,
        position: el.position,
        name: el.cell_name
      });
    }
  });
  return formatted;
}
