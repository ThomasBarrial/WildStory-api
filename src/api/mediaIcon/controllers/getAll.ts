import { MediaIconHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getAll: MediaIconHandlers['getAll'] = async (req, res, next) => {
  try {
    const mediaIcon = await prisma.mediaIcon.findMany({
      select: {
        id: true,
        name: true,
        iconUrl: true,
        mediaLink: true,
      },
    });
    return res.status(200).json(mediaIcon);
  } catch (error) {
    return next(error);
  }
};

export default getAll;
