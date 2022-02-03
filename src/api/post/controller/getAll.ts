/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: PostHandlers['getAll'] = async (req, res, next) => {
  const limit = +req.query.limit!;
  const offset = +req.query.offset!;

  try {
    const post = await prisma.post.findMany({
      skip: offset || undefined,
      take: limit || undefined,
      select: {
        id: true,
        text: true,
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
  } catch (e) {
    return next(e);
  }
};

export default getAll;
