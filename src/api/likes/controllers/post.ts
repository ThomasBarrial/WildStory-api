import { prisma } from '../../../../prisma/prismaClient';
import { LikesHandlers } from 'env';
import { verify } from 'jsonwebtoken';

const createLike: LikesHandlers['post'] = async (req, res, next) => {
  const { userId, postId } = req.body;

  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userId && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot like this for an other user',
        type: 'ACCES_ERROR',
      });
    }
    // Look for a like who already have the same user and post id
    const isLiked = await prisma.likes.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (isLiked === null) {
      const createlike = await prisma.likes.create({
        data: {
          userId,
          postId,
        },
        select: {
          id: true,
          postId: true,
          userId: true,
        },
      });
      await prisma.$disconnect();
      res.status(201).json(createlike);
    } else {
      throw new Error('you already like this post');
    }
  } catch (error) {
    next(error);
  }
};

export default createLike;
