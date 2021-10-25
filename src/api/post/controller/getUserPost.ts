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
        title: true,
        text: true,
        imageUrl: true,
        likes: true,
        comments: {
          select: {
            text: true,
            user: {
              select: {
                username: true,
              },
            },
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
