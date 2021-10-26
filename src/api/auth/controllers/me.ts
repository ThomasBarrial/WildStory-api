import { prisma } from '@prisma/prismaClient';
import { AuthHandler } from '../interface';

const me: AuthHandler['me'] = async (req, res, next) => {
  const id = req.cookies;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user) {
      return res.status(200).json(user);
    }

    res.status(401);
    throw new Error('Unknown user.');
  } catch (e) {
    return next(e);
  }
};

export default me;
