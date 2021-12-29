import { TopicsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: TopicsHandlers['getAll'] = async (req, res, next) => {
  try {
    const topics = await prisma.topics.findMany({
      select: {
        id: true,
        topicsName: true,
      },
    });
    res.status(200).json(topics);
  } catch (error) {
    next(error);
  }
};

export default getAll;
