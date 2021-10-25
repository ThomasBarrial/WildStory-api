import { commentsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: commentsHandlers['getAll'] = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany({});
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export default getAll;
