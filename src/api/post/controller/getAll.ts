import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: PostHandlers['getAll'] = async (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const limit = +req.query.limit!;

  try {
    const maxPost = await prisma.post.findMany();
    if (limit < maxPost.length) {
      const post = await prisma.post.findMany({
        skip: limit || undefined,
        take: 15,
        select: {
          id: true,
          text: true,
          likes: true,
          imageUrl: true,
          userId: true,
          topicsId: true,
          comments: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return res.status(200).json(post);
    } else {
      return res.send('no more post');
    }
  } catch (e) {
    return next(e);
  }
};

export default getAll;
