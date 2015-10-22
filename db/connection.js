import pgPromise from 'pg-promise';

const con = 'postgres://localhost/behove';

export const pgp = pgPromise();

export const db = pgp(con);
