import { postRegisterHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const postTopics: postRegisterHandler['post'] = async (req, res, next) => {
  const { postId, userId } = req.body;

  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userId && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot save this for an other user',
        type: 'ACCES_ERROR',
      });
    }
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
