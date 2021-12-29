import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updatePost: PostHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { text, imageUrl, topicsId } = req.body;
  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        text,
        imageUrl,
        topicsId,
      },
      select: {
        text: true,
        imageUrl: true,
        likes: true,
        comments: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updatePost;
