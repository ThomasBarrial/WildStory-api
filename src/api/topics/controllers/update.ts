import { TopicsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateTopics: TopicsHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { topicsName } = req.body;
  try {
    const topics = await prisma.topics.update({
      where: {
        id,
      },
      data: {
        topicsName,
      },
      select: {
        id: true,
        topicsName: true,
      },
    });
    res.sendStatus(204).json(topics);
  } catch (error) {
    next(error);
  }
};

export default updateTopics;
