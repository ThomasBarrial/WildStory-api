import { FormationHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateFormation: FormationHandlers['put'] = async (req, res, next) => {
  const { id } = req.params;
  const { formationName } = req.body;
  try {
    await prisma.formation.update({
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateFormation;
