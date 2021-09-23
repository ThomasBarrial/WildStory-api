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
        formation: {
          select: {
            formationName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};

export default getAll;
