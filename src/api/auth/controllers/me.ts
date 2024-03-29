import { prisma } from '../../../../prisma/prismaClient';
import { AuthHandler } from '../interface';
import { verify } from 'jsonwebtoken';

const me: AuthHandler['me'] = async (req, res) => {
  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);

    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
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
    if (user) {
      return res.status(200).json(user);
    }
    res.status(401);
    throw new Error('Unknown user.');
  } catch (e) {
    res.status(403).send({
      success: false,
      message: String(e),
    });
  }
};

export default me;
