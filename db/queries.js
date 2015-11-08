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
    return t.any(`SELECT
      comb_cols.id, comb_cols.comb_id, comb_cols.name,
      cells.id AS cell_id, cells.comb_col_id, cells.position, cells.name AS cell_name
      FROM comb_cols, cells WHERE comb_cols.comb_id = $1 AND
      cells.comb_col_id = comb_cols.id`, [comb_id]);
  });
}
