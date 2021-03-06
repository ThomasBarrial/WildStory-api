import { MediaLinkHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getUserMediaLink: MediaLinkHandlers['getUserMediaLinks'] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const userMediaLink = await prisma.mediaLink.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        link: true,
        iconId: true,
        userId: true,
      },
    });
    res.status(200).json(userMediaLink);
  } catch (error) {
    next(error);
  }
};

export default getUserMediaLink;
