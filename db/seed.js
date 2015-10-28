import { db, pgp } from './connection';
import uuid from 'node-uuid';

const words = ['subsumé', 'flambé', 'resumflay', 'assumé', 'resumbray'];

const seed = (t) => {
  return Promise.all([
    t.one("INSERT INTO users (username) VALUES ('unk') RETURNING id;"),
    t.one("INSERT INTO users (username) VALUES ('boozy hubert') RETURNING id;"),
    t.one("INSERT INTO users (username) VALUES ('bethany') RETURNING id;")
  ])
    .then((data) => {
      let combPromises = [];
      for (var i = 0; i < 10; i++) {
        combPromises.push(t.none(`INSERT INTO combs (id, user_id, name)
          VALUES ($1, $2, $3)`, [uuid.v4(), data[Math.floor(Math.random() * data.length)].id,
          words[Math.floor(Math.random() * words.length)]]));
      }
      return Promise.all(combPromises);
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
