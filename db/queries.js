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
          SELECT json_agg(c)
          FROM (
            SELECT *, (
              SELECT json_agg(l)
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

export function getCell(cell_id) {
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
