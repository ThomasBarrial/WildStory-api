import { postRegisterHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteSavedPost: postRegisterHandler['delete'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    await prisma.postRegister.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteSavedPost;
