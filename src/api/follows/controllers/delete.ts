import { followsHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const deleteFollow: followsHandler['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const follow = await prisma.follows.findUnique({
      where: {
        id,
      },
    });
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (
      jwtPayload.userId !== follow?.followerId &&
      jwtPayload.userId !== follow?.followingId
    ) {
      return res.status(401).send({
        message: 'You cannot do this for an other user',
        type: 'ACCES_ERROR',
      });
    }

    await prisma.follows.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default deleteFollow;
