import { db, pgp } from './connection';
import uuid from 'node-uuid';

const words = ['subsumé', 'flambé', 'resumflay', 'assumé', 'resumbray'];
const combUuids = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4, uuid.v4()];

const seed = (t) => {
  return Promise.all([
    t.one("INSERT INTO users (username) VALUES ('unk') RETURNING id;"),
    t.one("INSERT INTO users (username) VALUES ('boozy hubert') RETURNING id;"),
    t.one("INSERT INTO users (username) VALUES ('bethany') RETURNING id;")
  ])
    .then((data) => {
      let combPromises = [];
      data.forEach((el, ind) => {
        for (var i = 0; i < 5; i++) {
          combPromises.push(t.none("INSERT INTO combs_hist (user_id, comb_id, action, name)" +
            "VALUES ($1, $2, 1, $3)", [el.id, combUuids[Math.floor(Math.random() * combUuids.length)],
            words[Math.floor(Math.random() * words.length)]]));
        }
      });
      return Promise.all(combPromises);
    }, (err) => {
      console.log(err);
      pgp.end();
    });
}

db.task(seed)
  .then(() => {
    console.log('got here');
    pgp.end();
  }, (err) => {
    console.log(err);
    pgp.end();
  })
