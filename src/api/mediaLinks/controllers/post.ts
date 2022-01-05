import { MediaLinkHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const postMediaLink: MediaLinkHandlers['post'] = async (req, res, next) => {
  const { link, iconId, userId } = req.body;

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
    const mediaLink = await prisma.mediaLink.create({
      data: {
        link,
        iconId,
        userId,
      },
      select: {
        id: true,
        link: true,
        iconId: true,
        userId: true,
      },
    });
    res.status(201).json(mediaLink);
  } catch (error) {
    next(error);
  }
};

export default postMediaLink;
