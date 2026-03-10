import prisma from './prisma.js';
import { Prisma } from '@prisma/client';

export async function register(name: string, email: string) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email },
      });

      const welcomePost = await tx.post.create({
        data: {
          title: `Welcome to our platform, ${name}!`,
          content: 'We are excited to have you on board.',
          userId: user.id,
        },
      });

      return { user, welcomePost };
    });

    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Email already exists.');
      }
    }
    console.error('Registration Transaction Failed:', error);
    throw new Error('Could not complete registration.');
  }
}
