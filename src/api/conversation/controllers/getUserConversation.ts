import { ConversationHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserConversations: ConversationHandler['getUserConversations'] =
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const conversations = await prisma.conversation.findMany({
        where: {
          members: { connect: { user: id } },
        },
      });

      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  };

export default getUserConversations;
