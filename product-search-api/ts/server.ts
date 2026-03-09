import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import type { Request, Response } from 'express';

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.get('/products', async (req: Request, res: Response) => {
  const search = req.query.search as string;
  const minPrice = Number(req.query.minPrice) || undefined;
  const maxPrice = Number(req.query.maxPrice) || undefined;
  const sort = req.query.sort === 'desc' ? 'desc' : 'asc';

  const page = Number(req.query.page) || 1;
  const take = 5;
  const skip = (page - 1) * take;

  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
          {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          },
        ],
      },
      orderBy: { price: sort as 'asc' | 'desc' },
      take: take,
      skip: skip,
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unexpected error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
