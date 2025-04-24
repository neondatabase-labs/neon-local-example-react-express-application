import { sql } from './db.js';

export const getDefaultData = async () => {
  try {
    const result = await sql`SELECT version()`;

    return {
      env: process.env.NODE_ENV,
      data: result,
    };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
