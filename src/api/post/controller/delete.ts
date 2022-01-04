import { PostHandlers } from 'env';
import { prisma } from '../../../../prisma/prismaClient';

const deletePost: PostHandlers['delete'] = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.likes.deleteMany({
      where: {
        postId: id,
      },
    });
    await prisma.comment.deleteMany({
      where: {
        postId: id,
      },
    });
    await prisma.post.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default deletePost;
