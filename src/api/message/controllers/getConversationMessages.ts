import { MessagesHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getConversationMessages: MessagesHandler['getConversationMessages'] =
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const messages = await prisma.message.findMany({
        where: {
          conversationId: id,
        },

        select: {
          id: true,
          conversationId: true,
          senderId: true,
          text: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };

export default getConversationMessages;
