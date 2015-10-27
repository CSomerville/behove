import {db, pgp} from './connection';

const dropTables = (t) => {
  return Promise.all([
    t.none("DROP TABLE IF EXISTS users CASCADE;"),
    t.none("DROP TABLE IF EXISTS combs CASCADE;")
  ]);
}

const establishSchema = (t) => {
  return Promise.all([
    t.none("CREATE TABLE users (id SERIAL PRIMARY KEY, username text);"),
    t.none("CREATE TABLE combs (id uuid PRIMARY KEY, " +
      "user_id integer REFERENCES users(id), " +
      "created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), action integer, name text);")
  ]);
}

db.task(dropTables)
  .then(() => {
    db.task(establishSchema)
      .then(() => {
        console.log("behove db reset");
        pgp.end();
      }, (err) => {
        console.log(err);
        pgp.end();
      })
  }, (err) => {
    console.log(err);
    pgp.end();
  });
