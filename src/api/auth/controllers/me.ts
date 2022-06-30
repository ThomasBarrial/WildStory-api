import { prisma } from '../../../../prisma/prismaClient';
import { AuthHandler } from '../interface';
import { verify } from 'jsonwebtoken';

const me: AuthHandler['me'] = async (req, res) => {
  const token = req.headers.authorization;

  if (token === '') {
    return res
      .status(401)
      .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
  } else {
    const jwtPayload = verify(token as string, process.env.SECRET as string);

    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'Wrong token', type: 'LOGIN_ERROR' });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: jwtPayload.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        landimageUrl: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const content = { ...user, token };

    if (user) {
      return res.status(200).json(content);
    }
  }
};

export default me;
