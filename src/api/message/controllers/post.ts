import { MessagesHandler } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const createMessage: MessagesHandler['post'] = async (req, res, next) => {
  const { conversationId, senderId, text } = req.body;

  try {
    const Messsage = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        text,
      },
      select: {
        id: true,
        conversationId: true,
        senderId: true,
        text: true,
        createdAt: true,
      },
    });

    if (Messsage.text === '') {
      await prisma.message.delete({
        where: {
          id: Messsage.id,
        },
      });
      res.status(204).json('empty message');
    } else {
      res.status(201).json(Messsage);
    }
  } catch (error) {
    next(error);
  }
};

export default createMessage;
