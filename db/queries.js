import {db} from './connection';

export function createUser(username) {
  return db.task((t) => {
    t.none("INSERT INTO users (username) VALUES ('" + username + "');");
  });
}

// export function findUser(username) {
//   return new Promise((resolve, reject) => {
//     db.task((t) => {
//       t.one("SELECT * FROM users WHERE username = '" + username + "';");
//     })
//       .then
//   })
// }
