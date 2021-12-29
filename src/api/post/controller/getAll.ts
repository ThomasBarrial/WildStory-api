import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: PostHandlers['getAll'] = async (req, res, next) => {
  try {
    const post = await prisma.post.findMany({
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
    });
    return res.status(200).json(post);
  } catch (e) {
    return next(e);
  }
};

export default getAll;
