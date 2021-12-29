import { TopicsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postTopics: TopicsHandlers['post'] = async (req, res, next) => {
  const { topicsName } = req.body;

  try {
    const topics = await prisma.topics.create({
      data: {
        topicsName,
      },
      select: {
        id: true,
        topicsName: true,
      },
    });

    res.status(201).json(topics);
  } catch (error) {
    next(error);
  }
};

export default postTopics;
