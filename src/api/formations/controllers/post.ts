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
    res.status(422);
    next(error);
  }
};

export default postFormation;
