import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getOne: PostHandlers['getOne'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userPost = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        text: true,
        imageUrl: true,
        userId: true,
        topicsId: true,
        comments: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(userPost);
  } catch (err) {
    next(err);
  }
};

export default getOne;
