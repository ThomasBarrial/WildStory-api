import { prisma } from '../../../../prisma/prismaClient';
import { FormationHandlers } from 'env';

const getUsersFormation: FormationHandlers['getUsers'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const formationUsers = await prisma.user.findMany({
      where: {
        idFormation: id,
      },
      select: {
        id: true,
      },
    });
    res.status(200).json(formationUsers);
  } catch (error) {
    next(error);
  }
};

export default getUsersFormation;
