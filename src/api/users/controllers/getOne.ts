import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getOne: UserHandlers['getOne'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
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
    if (!user) return res.status(204);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export default getOne;
