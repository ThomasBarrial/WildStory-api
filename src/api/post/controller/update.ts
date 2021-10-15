import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updatePost: PostHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { title, text, imageUrl } = req.body;
  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        text,
        imageUrl,
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updatePost;
