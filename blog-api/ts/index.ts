import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const app = express();
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.post('/user', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Email might already exist or data is invalid' });
  }
});

app.post('/post', async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { id: authorId } },
      },
    });
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: 'Author not found' });
  }
});

app.post('/comment', async (req: Request, res: Response) => {
  try {
    const { text, postId } = req.body;
    const comment = await prisma.comment.create({
      data: {
        text: text,
        post: { connect: { id: postId } },
      },
    });
    res.json(comment);
  } catch (error) {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.get('/post/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
      comments: true,
    },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'User and their related posts/comments deleted!' });
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(3000, () => console.log('Blog API live at http://localhost:3000'));
