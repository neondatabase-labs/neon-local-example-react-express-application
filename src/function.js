import { sql } from './db.js';
export const getDefaultData = async () => {
  try {
    // Drop the table if it exists
    await sql`DROP TABLE IF EXISTS sample_users`;
    // Create a new sample table
    await sql`
      CREATE TABLE sample_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    // Insert sample data
    await sql`
      INSERT INTO sample_users (name, email)
      VALUES
        ('John Doe', 'john@example.com'),
        ('Jane Smith', 'jane@example.com'),
        ('Bob Johnson', 'bob@example.com')
    `;
    // Query the data
    const result = await sql`
      SELECT * FROM sample_users
      ORDER BY created_at DESC
    `;
    return {
      env: process.env.NODE_ENV,
      data: result,
    };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
