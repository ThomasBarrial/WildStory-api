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
    const topics = await prisma.conversation.update({
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
    res.sendStatus(204).json(topics);
  } catch (error) {
    next(error);
  }
};

export default updateConversation;
