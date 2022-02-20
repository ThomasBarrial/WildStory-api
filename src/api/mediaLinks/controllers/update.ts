import { MediaLinkHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';
import { verify } from 'jsonwebtoken';

const updateMediaLink: MediaLinkHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
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
        message: 'You cannot update this for an other user',
        type: 'ACCES_ERROR',
      });
    }
    await prisma.mediaLink.update({
      where: {
        id,
      },
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateMediaLink;
