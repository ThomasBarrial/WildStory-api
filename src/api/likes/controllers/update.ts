import { LikesHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const updateLike: LikesHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { userId, postId, isLike } = req.body;
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
    await prisma.likes.update({
      where: {
        id,
      },
      data: {
        userId,
        postId,
        isLike,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateLike;
