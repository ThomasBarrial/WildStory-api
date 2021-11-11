import { MediaLinkHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateMediaLink: MediaLinkHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { link, iconId, userId } = req.body;

  try {
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
