import 'dotenv/config';

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL
  ? `${process.env.DATABASE_URL}${process.env.DATABASE_URL.includes('?') ? '&' : '?'}sslmode=require`
  : 'postgres://neon:npg@localhost:5422/neondb?sslmode=require';

// Always request SSL but skip certificate verification unless NODE_PG_SSL_VERIFY is explicitly "true"
const sslOption = process.env.NODE_PG_SSL_VERIFY === 'true'
  ? undefined // default verification
  : { rejectUnauthorized: false };

export const sql = postgres(connectionString, {
  ssl: sslOption,
});

export default sql;
