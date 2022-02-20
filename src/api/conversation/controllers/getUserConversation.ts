import { ConversationHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserConversations: ConversationHandler['getUserConversations'] =
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const conversations = await prisma.conversation.findMany({
        where: {
          members: {
            some: {
              id,
            },
          },
        },
        select: {
          id: true,
          members: true,
          user1Id: true,
          user2Id: true,
          isNewMessage: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  };

export default getUserConversations;
