import { MediaLinkHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deleteMediaLink: MediaLinkHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.mediaLink.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default deleteMediaLink;
