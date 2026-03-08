import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  const updatedUser = await prisma.users.update({
    where: {
      email: 'rahul@email.com',
    },
    data: {
      age: 16,
    },
  });
  console.log('Update Successful! Nayi details:', updatedUser)
};

main()