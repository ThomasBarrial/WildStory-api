import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteFormation: UserHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.formation.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default deleteFormation;
