import { UserHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteUser: UserHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
