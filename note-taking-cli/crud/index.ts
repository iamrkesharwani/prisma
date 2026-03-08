import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Saving Note ---');
  const saveNote = await prisma.notes.upsert({
    where: { title: 'Prisma Study' },
    update: { content: 'Description for Prisma Study' },
    create: {
      title: 'Prisma Study',
      content: 'Learning CRUD operations today.',
    },
  });
  console.log('Success!', saveNote.title);

  console.log('\n--- My Notes Library ---');
  const allNotes = await prisma.notes.findMany();
  console.table(allNotes);

  console.log('\n--- Deleting Note ---');
  const deletedNote = await prisma.notes.delete({
    where: { title: 'My first note' },
  });
  console.log(deletedNote);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
