import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();
const connObj = {
	host: 'localhost',
  port: 5432,
  database: 'stackLite',
  user: 'postgres',
  password: 'postgres'
};
const connectionString = process.env.DB_URL;
const pool = new Pool(connObj);

export default pool;
