import { ConversationHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const createConversation: ConversationHandler['post'] = async (
  req,
  res,
  next
) => {
  const { senderId, receiverId } = req.body;

  try {
    const conversation = await prisma.conversation.create({
      data: {
        members: {
          connect: [{ id: senderId }, { id: receiverId }],
        },
      },
      select: {
        id: true,
        members: true,
      },
    });
    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

export default createConversation;
