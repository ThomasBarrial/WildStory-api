import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const createPost: PostHandlers['post'] = async (req, res, next) => {
  const { title, text, imageUrl, userId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        text,
        imageUrl,
        userId,
      },
      select: {
        id: true,
        title: true,
        text: true,
        likes: true,
        imageUrl: true,
        user: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
        userId: true,
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
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export default createPost;
