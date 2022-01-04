import { postRegisterHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserPostSaved: postRegisterHandler['getUsersPostSaved'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const userPostSaved = await prisma.postRegister.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        postId: true,
        userId: true,
      },
    });
    res.status(200).json(userPostSaved);
  } catch (error) {
    next(error);
  }
};

export default getUserPostSaved;
