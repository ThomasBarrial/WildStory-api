import { prisma } from '../../../../prisma/prismaClient';
import { LikesHandlers } from 'env';

const createLike: LikesHandlers['post'] = async (req, res, next) => {
  const { userId, postId } = req.body;

  try {
    // Look for a like who already have the same user and post id
    const isLiked = await prisma.likes.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (isLiked === null) {
      const createlike = await prisma.likes.create({
        data: {
          userId,
          postId,
        },
        select: {
          id: true,
          postId: true,
          userId: true,
        },
      });
      await prisma.$disconnect();
      res.status(201).json(createlike);
    } else {
      throw new Error('you already like this post');
    }
  } catch (error) {
    next(error);
  }
};

export default createLike;
