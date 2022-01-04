import { postRegisterHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postTopics: postRegisterHandler['post'] = async (req, res, next) => {
  const { postId, userId } = req.body;

  try {
    const savedPost = await prisma.postRegister.create({
      data: {
        postId,
        userId,
      },
      select: {
        id: true,
        postId: true,
        userId: true,
      },
    });

    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export default postTopics;
