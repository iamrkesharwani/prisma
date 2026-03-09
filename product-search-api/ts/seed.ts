import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning database...');
  await prisma.product.deleteMany();

  console.log('Seeding database...');
  await prisma.product.createMany({
    data: [
      { name: 'iPhone 15', price: 79999.99, category: 'Electronics' },
      { name: 'Samsung S24 Ultra', price: 124999.5, category: 'Electronics' },
      { name: 'MacBook M3 Air', price: 114900.0, category: 'Electronics' },
      { name: 'Nike Air Max', price: 12500.0, category: 'Fashion' },
      { name: 'Adidas Ultraboost', price: 18000.0, category: 'Fashion' },
      { name: 'Coffee Maker', price: 4500.0, category: 'Home' },
      { name: 'Gaming Chair', price: 22000.0, category: 'Furniture' },
      { name: 'Mechanical Keyboard', price: 8500.0, category: 'Electronics' },
      { name: 'Sony WH-1000XM5', price: 29990.0, category: 'Electronics' },
      { name: 'Apple Watch Series 9', price: 41900.0, category: 'Electronics' },
      { name: 'Dell XPS 13', price: 99999.0, category: 'Electronics' },
      { name: 'HP Pavilion Laptop', price: 68999.0, category: 'Electronics' },
      { name: 'Logitech MX Master 3S', price: 9995.0, category: 'Electronics' },
      { name: 'Wooden Study Table', price: 15000.0, category: 'Furniture' },
      { name: 'Office Desk Lamp', price: 2500.0, category: 'Home' },
      { name: 'Air Fryer', price: 7200.0, category: 'Home' },
      { name: 'Puma Running Shoes', price: 9000.0, category: 'Fashion' },
      { name: 'Levi’s Denim Jacket', price: 6500.0, category: 'Fashion' },
      { name: 'Bluetooth Speaker', price: 5500.0, category: 'Electronics' },
      { name: '4K Smart TV 55"', price: 52000.0, category: 'Electronics' },
    ],
  });
  console.log('Seeding complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
