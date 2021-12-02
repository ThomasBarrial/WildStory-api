import { CommentsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteLike: CommentsHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.likes.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteLike;
