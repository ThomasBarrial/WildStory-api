import { LikesHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const deleteLike: LikesHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userLike = await prisma.likes.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userLike?.userId && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot delete this for an other user',
        type: 'ACCES_ERROR',
      });
    }
    await prisma.likes.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteLike;
