import { Client } from 'pg';

const connectionString = 'postgresql://postgres:postgres@localhost:5432/stackLite';
const client = new Client({
  connectionString: connectionString,
});

client.connect();

export default client;