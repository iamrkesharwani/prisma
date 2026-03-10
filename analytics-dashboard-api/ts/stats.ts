import prisma from './prisma.js';

export const getDashboardStats = async () => {
  const [userCount, postCount, commentCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
  ]);

  const avgComments = postCount > 0 ? (commentCount / postCount).toFixed(2) : 0;

  return {
    totalUsers: userCount,
    totalPosts: postCount,
    totalComments: commentCount,
    avgCommentPerPost: avgComments,
  };
};

export const getTopAuthors = async () => {
  return await prisma.post.groupBy({
    by: ['userId'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: 5,
  });
};

export const getGmailUsers = async () => {
  const result = await prisma.$queryRaw<any[]>`
    SELECT count(*)::int AS gmailUsers
    FROM "User"
    WHERE email LIKE '%@gmail.com'
  `;
  return result[0];
};
