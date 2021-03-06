import promise from 'bluebird';
import dotenv from 'dotenv';

const options = {
  // Initialization Options
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);

dotenv.config();
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

export default db;
