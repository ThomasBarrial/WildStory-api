import { ConversationHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const createConversation: ConversationHandler['post'] = async (
  req,
  res,
  next
) => {
  const { senderId, receiverId } = req.body;

  try {
    const checkConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            members: {
              some: {
                id: senderId,
              },
            },
          },
          {
            members: {
              some: {
                id: receiverId,
              },
            },
          },
        ],
      },
    });

    if (checkConversation) {
      res.status(500).json('This conversation already exist');
    } else {
      const conversation = await prisma.conversation.create({
        data: {
          user1Id: senderId,
          user2Id: receiverId,
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
    }
  } catch (error) {
    next(error);
  }
};

export default createConversation;
