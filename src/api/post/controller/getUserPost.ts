import { UserPostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserPost: UserPostHandlers['getUserPost'] = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        text: true,
        imageUrl: true,
        userId: true,
        comments: {
          select: {
            text: true,
            userId: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(userPosts);
  } catch (err) {
    next(err);
  }
};

export default getUserPost;
