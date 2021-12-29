import { TopicsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: TopicsHandlers['getPosts'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const topicsPost = await prisma.post.findMany({
      where: {
        topicsId: id,
      },
      select: {
        id: true,
        text: true,
        likes: true,
        comments: true,
        imageUrl: true,
        postRegister: true,
        topicsId: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(topicsPost);
  } catch (error) {
    next(error);
  }
};

export default getAll;
