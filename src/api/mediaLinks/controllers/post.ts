import { MediaLinkHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postMediaLink: MediaLinkHandlers['post'] = async (req, res, next) => {
  const { link, iconId, userId } = req.body;

  try {
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
