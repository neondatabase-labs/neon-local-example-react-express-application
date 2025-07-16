import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';

if (process.env.NODE_ENV !== 'prod') {
  neonConfig.fetchEndpoint = 'http://localhost:5432/sql';
}

const connectionString =
  process.env.NODE_ENV === 'prod' ? process.env.DATABASE_URL : 'postgres://neon:npg@localhost:5432/neondb';

export const sql = neon(connectionString);
