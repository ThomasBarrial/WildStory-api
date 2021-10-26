import { CommentsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postComment: CommentsHandlers['post'] = async (req, res, next) => {
  const { text, userId, postId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        postId,
      },
      select: {
        id: true,
        text: true,
        userId: true,
        postId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(422);
    next(error);
  }
};

export default postComment;
