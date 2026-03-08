import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.users.create({
    data: {
      name: 'Rahul',
      email: 'rahul@email.com',
      age: 15,
    },
  });
  console.log('User created:', user);
}

main()
  .catch((e) => {
    console.error('Unexpected error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
