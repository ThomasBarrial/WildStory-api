import { CommentsHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const postComment: CommentsHandlers['post'] = async (req, res, next) => {
  const { text, userId, postId } = req.body;

  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userId && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot delete this for an other user',
        type: 'ACCES_ERROR',
      });
    }
    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        postId,
      },
      select: {
        id: true,
        text: true,
        userId: true,
        postId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(422);
    next(error);
  }
};

export default postComment;
