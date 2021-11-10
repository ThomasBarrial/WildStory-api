import { MediaIconHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteMediaIcon: MediaIconHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.mediaIcon.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default deleteMediaIcon;
