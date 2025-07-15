import 'dotenv/config';

import pg from 'pg';

const { Pool } = pg;

const isProd = Boolean(process.env.DATABASE_URL);

const connectionString = isProd
  ? `${process.env.DATABASE_URL}${process.env.DATABASE_URL.includes('?') ? '&' : '?'}sslmode=require`
  : 'postgres://neon:npg@localhost:5432/neondb?sslmode=no-verify';

const pool = new Pool({
  connectionString,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

// Tagged-template helper to match previous sql`…` usage
export const sql = async (strings, ...values) => {
  // Build parameterized query: text with $1, $2… placeholders
  const text = strings.reduce((acc, str, i) => acc + str + (i < values.length ? `$${i + 1}` : ''), '');
  const res = await pool.query(text, values);
  return res.rows;
};

// Export pool for optional direct access
export { pool };
