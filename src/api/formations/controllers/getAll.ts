import { FormationHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: FormationHandlers['getAll'] = async (req, res, next) => {
  try {
    const formation = await prisma.formation.findMany({
      select: {
        id: true,
        formationName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(formation);
  } catch (error) {
    next(error);
  }
};

export default getAll;
