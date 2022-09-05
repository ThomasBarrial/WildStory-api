import { prisma } from '../../../../prisma/prismaClient';
import { ConversationHandler } from 'env';

const getOneConversation: ConversationHandler['getOneConversations'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        createdAt: true,
        members: true,
        isNewMessage: true,
        message: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};

export default getOneConversation;
