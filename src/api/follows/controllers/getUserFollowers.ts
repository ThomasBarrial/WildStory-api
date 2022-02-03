import { prisma } from '../../../../prisma/prismaClient';
import { followsHandler } from 'env';

const getUserFollowers: followsHandler['getUserFollowers'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const follows = await prisma.follows.findMany({
      where: {
        followingId: id,
      },
      select: {
        id: true,
        followerId: true,
      },
    });
    res.status(201).json(follows);
  } catch (error) {
    next(error);
  }
};

export default getUserFollowers;
