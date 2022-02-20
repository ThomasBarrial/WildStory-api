import { TopicsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteTopics: TopicsHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.topics.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default deleteTopics;
