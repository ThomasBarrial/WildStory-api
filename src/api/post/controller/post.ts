import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const createPost: PostHandlers['post'] = async (req, res, next) => {
  const { text, imageUrl, userId, topicsId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        topicsId,
        text,
        imageUrl,
        userId,
      },
      select: {
        id: true,
        text: true,
        likes: true,
        imageUrl: true,
        userId: true,
        topicsId: true,
        comments: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export default createPost;
