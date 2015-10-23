import pgPromise from 'pg-promise';

const con = process.env.DATABASE_URL || 'postgres://localhost/behove';

export const pgp = pgPromise();

export const db = pgp(con);
