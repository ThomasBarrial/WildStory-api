import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const createPost: PostHandlers['post'] = async (req, res, next) => {
  const { text, imageUrl, userId, topicsId } = req.body;

  try {
    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userId && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot create this for an other user',
        type: 'ACCES_ERROR',
      });
    }
    const post = await prisma.post.create({
      data: {
        topicsId,
        text,
        imageUrl,
        userId,
      },
      select: {
        id: true,
        text: true,
        likes: true,
        imageUrl: true,
        userId: true,
        topicsId: true,
        comments: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export default createPost;
