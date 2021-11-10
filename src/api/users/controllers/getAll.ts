import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: UserHandlers['getAll'] = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        city: true,
        birthDate: true,
        avatarUrl: true,
        landimageUrl: true,
        idFormation: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export default getAll;
