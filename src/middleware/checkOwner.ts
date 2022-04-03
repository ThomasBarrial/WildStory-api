import { RequestHandler } from 'express';

const checkOwner: RequestHandler<{ id?: string }> = (req, res, next): void => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    if (userId !== id) {
      throw new Error(`You can't do this for an other user`);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkOwner;
