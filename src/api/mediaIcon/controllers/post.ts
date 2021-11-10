import { MediaIconHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const postMediaIcon: MediaIconHandlers['post'] = async (req, res, next) => {
  const { name, iconUrl } = req.body;

  try {
    const mediaIcon = await prisma.mediaIcon.create({
      data: {
        name,
        iconUrl,
      },
      select: {
        id: true,
        name: true,
        iconUrl: true,
      },
    });
    res.status(201).json(mediaIcon);
  } catch (error) {
    next(error);
  }
};

export default postMediaIcon;
