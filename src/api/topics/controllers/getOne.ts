import { TopicsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getOne: TopicsHandlers['getOne'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const topics = await prisma.topics.findUnique({
      where: {
        id,
      },
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

export default getOne;
