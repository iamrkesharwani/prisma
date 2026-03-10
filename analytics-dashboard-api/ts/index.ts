import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { register } from './register.js';
import { getDashboardStats, getGmailUsers, getTopAuthors } from './stats.js';

const app = express();
app.use(express.json());

app.get('/stats', async (_: Request, res: Response) => {
  const stats = await getDashboardStats();
  res.json(stats);
});

app.get('/stats/top-authors', async (_: Request, res: Response) => {
  const authors = await getTopAuthors();
  res.json(authors);
});

app.get('/stats/gmail-users', async (_: Request, res: Response) => {
  const data = await getGmailUsers();
  res.json(data);
});

app.post('/signup', async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.json(400).json({ error: 'Name and Email are required' });

  try {
    const data = await register(name, email);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server ready at: http://localhost:3000'));
