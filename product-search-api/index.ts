import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { products } from './products.js';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Clearing Database...');
  await prisma.products.deleteMany();

  console.log('Seeding products...');
  await prisma.products.createMany({ data: products });

  const budgetItems = await prisma.products.findMany({
    where: {
      price: { lt: 10000 },
    },
  });

  console.log('Budget Items:');
  console.table(budgetItems);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
