import { FormationHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postFormation: FormationHandlers['post'] = async (req, res, next) => {
  const { formationName } = req.body;

  try {
    const formation = await prisma.formation.create({
      data: {
        formationName,
      },
      select: {
        id: true,
        formationName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(formation);
  } catch (error) {
    next(error);
  }
};

export default postFormation;
