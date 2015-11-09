import {db, pgp} from './connection';

const historyTrigger = `
  create or replace function comb_hist_func() returns trigger as $body$
  begin
    if tg_op = 'INSERT' then
      insert into combs_hist (user_id, comb_id, action, name)
      values (new.user_id, new.id, 'c', new.name);
      return new;
    elsif tg_op = 'UPDATE' then
      insert into combs_hist (user_id, comb_id, action, name)
      values (new.user_id, new.id, 'u', new.name);
      return new;
    elsif tg_op = 'DELETE' then
      insert into combs_hist (user_id, comb_id, action, name)
      values (old.user_id, old.id, 'd', old.name);
      return old;
    end if;
  end;
  $body$ language plpgsql;`

const dropTables = (t) => {
  return Promise.all([
    t.none("DROP TABLE IF EXISTS users CASCADE;"),
    t.none("DROP TABLE IF EXISTS combs CASCADE;"),
    t.none("DROP TABLE IF EXISTS combs_hist CASCADE;"),
    t.none("DROP TABLE IF EXISTS comb_cols CASCADE;"),
    t.none("DROP TABLE IF EXISTS cells CASCADE;")
  ]);
}

const establishSchema = (t) => {
  return Promise.all([
    t.none("CREATE TABLE users (id SERIAL PRIMARY KEY, username text);"),
    t.none("CREATE TABLE combs (id uuid PRIMARY KEY, user_id integer REFERENCES users(id), " +
      "name text);"),
    t.none("CREATE TABLE combs_hist (id SERIAL PRIMARY KEY, " +
      "user_id integer REFERENCES users(id), comb_id uuid, " +
      "tstamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), action text, name text);"),
    t.none(historyTrigger),
    t.none("CREATE TRIGGER combs_hist_trig AFTER INSERT OR UPDATE OR DELETE " +
      "ON combs FOR EACH ROW EXECUTE PROCEDURE comb_hist_func();"),
    t.none(`CREATE TABLE comb_cols (id uuid PRIMARY KEY, comb_id uuid REFERENCES combs(id),
      position integer, name text);`),
    t.none(`CREATE TABLE cells (id uuid PRIMARY KEY, comb_col_id uuid REFERENCES comb_cols(id),
       position integer, name text);`)
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
