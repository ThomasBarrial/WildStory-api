import { prisma } from '../../../../prisma/prismaClient';
import { followsHandler } from 'env';

const getUserFollowings: followsHandler['getUserFollowing'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const follows = await prisma.follows.findMany({
      where: {
        followerId: id,
      },
      select: {
        id: true,
        followingId: true,
      },
    });
    res.status(201).json(follows);
  } catch (error) {
    next(error);
  }
};

export default getUserFollowings;
