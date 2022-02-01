import { prisma } from '../../../../prisma/prismaClient';
import { followsHandler } from 'env';

const postFollows: followsHandler['post'] = async (req, res, next) => {
  const { followerId, followingId } = req.body;

  try {
    const follow = await prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
      select: {
        id: true,
        followerId: true,
        followingId: true,
      },
    });
    res.status(201).json(follow);
  } catch (error) {
    next(error);
  }
};

export default postFollows;
