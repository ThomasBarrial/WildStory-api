import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const putUser: UserHandlers['put'] = async (req, res, next) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    city,
    birthDate,
    avatarUrl,
    landimageUrl,
  } = req.body;
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        password,
        city,
        birthDate,
        avatarUrl,
        landimageUrl,
      },
      select: {
        id: true,
        username: true,
        email: true,
        city: true,
        birthDate: true,
        avatarUrl: true,
        landimageUrl: true,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default putUser;
