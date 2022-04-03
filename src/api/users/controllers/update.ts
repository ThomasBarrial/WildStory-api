import { UserHandlers } from 'env';
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
    idFormation,
  } = req.body;
  try {
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
        idFormation,
      },
      select: {
        id: true,
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

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
