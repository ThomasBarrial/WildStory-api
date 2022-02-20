import { FormationHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateFormation: FormationHandlers['put'] = async (req, res, next) => {
  const { id } = req.params;
  const { formationName } = req.body;
  try {
    const formation = await prisma.formation.update({
      where: {
        id,
      },
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
    res.sendStatus(204).json(formation);
  } catch (error) {
    next(error);
  }
};

export default updateFormation;
