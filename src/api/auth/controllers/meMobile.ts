import { prisma } from '../../../../prisma/prismaClient';
import { AuthHandler } from '../interface';
import { verify } from 'jsonwebtoken';

const meMobile: AuthHandler['me'] = async (req, res) => {
  const token = req.headers.authorization;

  if (token === '') {
    return res
      .status(401)
      .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
  } else {
    try {
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
          profilTitle: true,
          avatarUrl: true,
          city: true,
          idFormation: true,
          birthDate: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const content = { ...user, token };

      if (user) {
        return res.status(200).json(content);
      }
    } catch (err) {
      res.status(403).send({
        success: false,
        message: String(err),
      });
    }
  }
};

export default meMobile;
