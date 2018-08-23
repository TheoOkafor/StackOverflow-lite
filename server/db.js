import promise from 'bluebird';

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = 'postgresql://postgres:postgres@localhost:5432/stackLite';
const db = pgp(connectionString);

export default db;
