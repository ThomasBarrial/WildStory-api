import { UserHandlers } from 'env';
import { verify } from 'jsonwebtoken';
import { prisma } from '../../../../prisma/prismaClient';

const updateUser: UserHandlers['put'] = async (req, res, next) => {
  const { id } = req.params;

  const {
    username,
    email,
    city,
    birthDate,
    avatarUrl,
    landimageUrl,
    profilTitle,
  } = req.body;
  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }
    console.log(jwtPayload.role);
    if (jwtPayload.userId !== id && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot update an other user',
        type: 'ACCES_ERROR',
      });
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        profilTitle,
        email,
        city,
        birthDate,
        avatarUrl,
        landimageUrl,
      },
      select: {
        username: true,
        profilTitle: true,
        role: true,
        email: true,
        city: true,
        birthDate: true,
        idFormation: true,
        avatarUrl: true,
        landimageUrl: true,
      },
    });

    return res.status(204).json(user);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
