import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getOne: UserHandlers['getOne'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const formation = await prisma.formation.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        formationName: true,
      },
    });

    res.status(200).json(formation);
  } catch (error) {
    next(error);
  }
};

export default getOne;
