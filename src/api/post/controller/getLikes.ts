import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const getLikes: PostHandlers['getLikes'] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postLikes = await prisma.post
      .findUnique({
        where: {
          id,
        },
      })
      .likes();

    res.status(200).json(postLikes);
  } catch (err) {
    next(err);
  }
};

export default getLikes;
