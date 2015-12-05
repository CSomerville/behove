import {db} from './connection';

export function createUser(username) {
  return db.task((t) => {
    return t.none("INSERT INTO users (username) VALUES ($1);", [username]);
  });
}

export function findUser(username) {
  return db.task((t) => {
    return t.one("SELECT * FROM users WHERE username = $1;", [username]);
  });
}

export function userCombs(user_id) {
  return db.task((t) => {
    return t.any("SELECT * FROM combs WHERE user_id = $1;", [user_id]);
  });
}

export function findComb(id) {
  return db.task((t) => {
    return t.one("SELECT * FROM combs WHERE id = $1;", [id]);
  });
}

export function createComb(user_id, comb) {
  return db.task((t) => {
    return t.none("INSERT INTO combs (id, user_id, name) VALUES ($1, $2, $3);",
      [comb.id, user_id, comb.name]);
  });
}

export function updateComb(comb) {
  return db.task((t) => {
    return t.none("UPDATE combs SET name = $1 WHERE id = $2;",
      [comb.name, comb.id]);
  });
}

export function getOneComb(comb_id) {
  return db.task((t) => {
    return t.one( `
        SELECT id, name, (
          SELECT COALESCE(json_agg(c), '[]')
          FROM (
            SELECT *, (
              SELECT COALESCE(json_agg(l), '[]')
              FROM (
                SELECT * from cells
                WHERE comb_cols.id = cells.comb_col_id
              ) l
            ) AS cells
            FROM comb_cols
            WHERE comb_id = $1
          ) c
        ) AS cols
        FROM combs
        WHERE id = $1;
      `, [comb_id]);
  });
}

export function findCombCol(comb_col_id) {
  return db.task((t) => {
    return t.one("SELECT * FROM comb_cols WHERE id = $1", [comb_col_id]);
  });
}

export function updateCombCol(comb_col) {
  return db.task((t) => {
    return t.none("UPDATE comb_cols SET name = $1 WHERE id = $2;",
      [comb_col.name, comb_col.id]);
  });
}

export function updateColPoses(cols) {
  return db.task((t) => {

    let promises = [];
    cols.forEach((col) => {
      promises.push(t.none("UPDATE comb_cols SET position = $1 WHERE id = $2;", [col.position, col.id]));
    });

    return Promise.all(promises);
  })
}

export function createCombCol(comb_col) {
  return db.task((t) => {
    return t.none("INSERT INTO comb_cols (id, comb_id, name, position) VALUES ($1, $2, $3, $4);",
      [comb_col.id, comb_col.combId, comb_col.name, comb_col.position]);
  });
}

export function deleteCol(id) {
  return db.task((t) => {
    return Promise.all[
      t.none("DELETE FROM cells WHERE comb_col_id = $1", [id]),
      t.none("DELETE FROM comb_cols WHERE id = $1;", [id])
    ]
  })
}

export function findCell(cell_id) {
  return db.task((t) => {
    return t.one("SELECT * FROM cells WHERE id = $1", [cell_id]);
  });
}

export function updateCell(cell) {
  return db.task((t) => {
    return t.none("UPDATE cells SET name = $1, position = $2 WHERE id = $3",
      [cell.name, cell.position, cell.id]);
  });
}

export function createCell(cell) {
  return db.task((t) => {
    return t.one("INSERT INTO cells (id, comb_col_id, name, position) VALUES ($1, $2, $3, $4)",
      [cell.id, cell.combColId, cell.name, cell.position]);
  });
}

export function updateCellPoses(cells) {
  return db.task((t) => {

    let promises = [];
    cells.forEach((cell) => {
      promises.push(t.none("UPDATE cells SET position = $1, comb_col_id = $2 WHERE id = $3;",
        [cell.position, cell.combColId, cell.id]));
    });

    return Promise.all(promises);
  });
}

export function deleteCell(id) {
  return db.task((t) => {
    return t.none("DELETE FROM cells WHERE id = $1", [id]);
  });
}

export function findChecklist(id) {
  return db.task((t) => {
    return t.one("SELECT * FROM checklists WHERE id = $1", [id]);
  });
}

export function createChecklist(checklist) {
  return db.task((t) => {
    return t.none("INSERT INTO checklists (id, cell_id, name) VALUES ($1, $2, $3)",
      [checklist.id, checklist.cellId, checklist.name]);
  });
}

export function updateChecklist(checklist) {
  return db.task((t) => {
    return t.none("UPDATE checklists SET name = $1 WHERE id = $2", [checklist.name, checklist.id]);
  });
}

export function deleteChecklist(id) {
  return db.task((t) => {
    return t.none("DELETE FROM checklists WHERE id = $1", [id]);
  })
}

export function findOneCell(id) {
  return db.task((t) => {
    return t.one(`
        WITH checklist_ids AS (
          SELECT id FROM checklists
          WHERE cell_id = $1
        )
        SELECT *, (
          SELECT COALESCE(json_agg(c), '[]')
          FROM (
            SELECT * FROM checklists WHERE cell_id = $1
          ) c
        ) AS checklists, (
          SELECT COALESCE(json_agg(ch), '[]')
          FROM (
            SELECT * FROM checklist_items
            WHERE checklist_id IN (SELECT * FROM checklist_ids)
          ) ch
        ) AS checklist_items
        FROM cells
        WHERE id = $1
      `, [id])
  });
}

export function findChecklistItem(id) {
  return db.task((t) => {
    return t.one("SELECT * FROM checklist_items WHERE id = $1", [id])
  });
}

export function createChecklistItem(item) {
  return db.task((t) => {
    t.none(`INSERT INTO checklist_items (id, checklist_id, completed, position, name) VALUES
            ($1, $2, $3, $4, $5)`, [item.id, item.checklistId, item.completed, item.position, item.name]);
  });
}

export function updateChecklistItem(item) {
  return db.task((t) => {
    t.none(`UPDATE checklist_items SET checklist_id = $1, completed = $2, position = $3,
            name = $4 WHERE id = $5`,
            [item.checklistId, item.completed, item.position, item.name, item.id]);
  });
}
