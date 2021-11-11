import { MediaIconHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const updateMediaIcon: MediaIconHandlers['update'] = async (req, res, next) => {
  const { id } = req.params;
  const { name, iconUrl } = req.body;
  try {
    await prisma.mediaIcon.update({
      where: {
        id,
      },
      data: {
        name,
        iconUrl,
      },
      select: {
        id: true,
        iconUrl: true,
        mediaLink: true,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default updateMediaIcon;
