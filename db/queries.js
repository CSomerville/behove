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

export function createComb(user_id, name) {
  db.task((t) => {
    return t.one("INSERT INTO combs (name) VALUES ($1) RETURNING id;", [name]);
  })
    .then((data) => {
      return db.task((t) => {
        t.none("INSERT INTO combs_hist (user_id, comb_id, action, name) VALUES ($1, $2, 0, $3);",
        [user_id, data.id, name]);
      });
    }, (err) => {
      console.log(err);
    });
}
