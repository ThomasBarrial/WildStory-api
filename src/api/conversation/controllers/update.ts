import { ConversationHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateConversation: ConversationHandler['update'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { isNewMessage } = req.body;
  try {
    const conversation = await prisma.conversation.update({
      where: {
        id,
      },
      data: {
        isNewMessage,
      },
      select: {
        id: true,
        members: true,
      },
    });
    res.status(204).json(conversation);
  } catch (error) {
    next(error);
  }
};

export default updateConversation;
