import { ConversationHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteConversation: ConversationHandler['delete'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    await prisma.message.deleteMany({
      where: {
        conversationId: id,
      },
    });

    await prisma.conversation.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deleteConversation;
