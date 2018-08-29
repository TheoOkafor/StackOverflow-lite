import promise from 'bluebird';
import dotenv from 'dotenv';

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);
dotenv.config();
const co = {
	host: 'localhost',
  port: 5432,
  database: 'stackLite',
  user: 'postgres',
  password: 'postgres'
}
const connectionString = process.env.DB_URL;
const db = pgp(co);

export default db;
