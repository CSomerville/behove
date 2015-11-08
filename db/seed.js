import { db, pgp } from './connection';
import uuid from 'node-uuid';

const words = ['subsumé', 'flambé', 'resumflay', 'assumé', 'resumbray'];
const colNames = ['pshaw', 'hmmm-hmmm', 'thus'];
const cellNames = ['splutter', 'mutter', 'putter'];

const seed = (t) => {
  return Promise.all([
    t.one("INSERT INTO users (username) VALUES ('unk') RETURNING id;"),
    t.one("INSERT INTO users (username) VALUES ('boozy hubert') RETURNING id;"),
    t.one("INSERT INTO users (username) VALUES ('bethany') RETURNING id;")
  ])
    .then((userIds) => {
      let combPromises = [];
      for (var i = 0; i < 10; i++) {
        combPromises.push(t.one(`INSERT INTO combs (id, user_id, name)
          VALUES ($1, $2, $3) RETURNING id;`, [uuid.v4(), userIds[Math.floor(Math.random() * userIds.length)].id,
          words[Math.floor(Math.random() * words.length)]]));
      }
      return Promise.all(combPromises);
    }, (err) => {
      console.log(err);
      pgp.end();
    })
      .then((combIds) => {
        let combColPromises = [];
        for (let i of combIds) {
          for (let j of colNames) {
            combColPromises.push(t.one(`INSERT INTO comb_cols (id, comb_id, name) VALUES
              ($1, $2, $3) RETURNING id;`, [uuid.v4(), i.id, j]));
          }
        }
        return Promise.all(combColPromises);
      }, (err) => {
        console.log(err);
        pgp.end();
      })
        .then((combColIds) => {
          let cellPromises = [];
          for (let i of combColIds) {
            cellNames.forEach((el, ind) => {
              cellPromises.push(t.one(`INSERT INTO cells (id, comb_col_id, position, name) VALUES
                ($1, $2, $3, $4) RETURNING id;`, [uuid.v4(), i.id, ind, el]));
            });
          }
          return Promise.all(cellPromises);
        }, (err) => {
          console.log(err);
          pgp.end();
        });
}

db.task(seed)
  .then(() => {
    pgp.end();
  }, (err) => {
    console.log(err);
    pgp.end();
  })
