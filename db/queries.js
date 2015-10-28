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
    return t.any("INSERT INTO combs (id, user_id, name) VALUES ($1, $2, $3);",
      [comb.id, user_id, comb.name]);
  });
}

export function updateComb(user_id, comb) {
  return db.task((t) => {
    return t.any("UPDATE combs SET user_id = $1, name = $2 WHERE id = $3;",
      [user_id, comb.name, comb.id]);
  });
}
