import { LikesHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateLike: LikesHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { userId, postId, isLike } = req.body;
  try {
    await prisma.likes.update({
      where: {
        id,
      },
      data: {
        userId,
        postId,
        isLike,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateLike;
