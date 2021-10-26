import { CommentsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteComment: CommentsHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteComment;
