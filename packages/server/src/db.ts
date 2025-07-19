const { Pool } = require('pg');
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_USER);

// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432')
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};