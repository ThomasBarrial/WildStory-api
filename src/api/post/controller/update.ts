import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const updatePost: PostHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { text, imageUrl, topicsId } = req.body;
  try {
    const userPost = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    const jwtPayload = verify(req.cookies.token, process.env.SECRET as string);
    if (typeof jwtPayload === 'string') {
      return res
        .status(401)
        .json({ message: 'You need to login', type: 'LOGIN_ERROR' });
    }

    if (jwtPayload.userId !== userPost?.userId && jwtPayload.role !== 'ADMIN') {
      return res.status(401).send({
        message: 'You cannot update this for an other user',
        type: 'ACCES_ERROR',
      });
    }
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        text,
        imageUrl,
        topicsId,
      },
      select: {
        text: true,
        imageUrl: true,
        comments: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updatePost;
