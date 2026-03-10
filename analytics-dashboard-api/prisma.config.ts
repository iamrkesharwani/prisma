import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const DB_URL = process.env['DB_URL'];

if (!DB_URL) {
  throw new Error('DB_URL environment variable is not set');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: DB_URL,
  },
});
